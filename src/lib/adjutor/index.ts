import axios, {Axios, AxiosError, AxiosResponse} from 'axios';
import {BASE_URL, URLS, API_KEY} from './data/constants';
import {GatewayError, ServerError} from '../../error';
import {
  AdjutorErrorResponseI,
  AdjutorResponseI,
  KarmaInquiryResponsePayload,
} from './interface';

class AdjutorAPI {
  private api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      response => {
        return response;
      },
      (error: AxiosError<AdjutorErrorResponseI>) => {
        // If error doesnt have response most likely network
        if (!error.response) {
          return Promise.reject(
            new ServerError(
              'Network Error Occurred, PLease check Internet Connection.'
            )
          );
        }

        const {response} = error;
        if (response && response.data) {
          const {data, status} = response;
          // If status code is 404 & there is return data, the user information is can't be found
          // NOTE: Safe to this operation without checking the request url because its a single endpoint used
          if (status === 404 && data.status === 'success') {
            const payload: AdjutorResponseI<null> = {
              status: data.status,
              message: data.message,
              data: null,
            };
            return {
              data: payload,
            };
          }
          const {message} = data;
          return Promise.reject(new GatewayError(message));
        }
        return Promise.reject(
          new GatewayError('Something went wrong, please contact admin')
        );
      }
    );
  }

  async isBlackListed(email: string) {
    const {data} = (await this.api.get(
      `${URLS.KARMA}/${email}`
    )) as AxiosResponse<AdjutorResponseI<KarmaInquiryResponsePayload>>;

    if (data.status === 'success' && data.data && data.data.karma_identity) {
      return true;
    }
    return false;
  }
}

export default new AdjutorAPI();
