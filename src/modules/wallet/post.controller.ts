import {Request, Response, NextFunction} from 'express';
import {WalletPostPayloadSchema} from './schema';
import {PostPayloadDTO} from './interface';
import {capitalize} from 'lodash';
import postsService from './posts.service';

export default {
  create: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {user} = request;
      const {type} = request.params;

      const {body} = request;

      const payload = {
        type,
        initiated_by: user.id,
        ...body,
      };

      const value: PostPayloadDTO =
        await WalletPostPayloadSchema.validateAsync(payload);
      const data = await postsService.handlePost();
      return response.json({
        message: `${capitalize(type)} Initiated Successfully`,
      });
    } catch (error) {
      return next(error);
    }
  },
};
