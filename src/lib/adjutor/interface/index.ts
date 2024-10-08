export interface AdjutorResponseI<T> {
  status: string;
  message: string;
  data: T;
}

export interface AdjutorErrorResponseI {
  message: string;
  status: string;
  error_code: number;
}
export interface KarmaInquiryResponsePayload {
  karma_identity: string;
  amount_in_contention: string;
  reason: string;
  default_date: string;
  karma_type: {
    karma: 'Others';
  };
  karma_identity_type: {
    identity_type: 'Domain';
  };
  reporting_entity: {
    name: string;
    email: string;
  };

  meta: {
    cost: number;
    balance: number;
  };
}
