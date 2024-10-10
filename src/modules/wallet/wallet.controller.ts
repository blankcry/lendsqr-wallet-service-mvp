import {Request, Response, NextFunction} from 'express';
import walletService from './wallet.service';

export default {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {user} = request;
      const wallet = await walletService.getUserWallet(user.id);
      const ledger = await wallet.$relatedQuery('ledger');
      return response.json({
        data: {
          wallet,
          ledger,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
