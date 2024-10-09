import {Request, Response, NextFunction} from 'express';

export default {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      return response.json({
        message: 'Transfer Initiated Successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};
