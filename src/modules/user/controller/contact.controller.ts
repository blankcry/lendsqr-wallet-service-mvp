import {Request, Response, NextFunction} from 'express';
import userService from '../user.service';

export default {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {id} = request.user;
      const data = await userService.getContacts(id);
      return response.status(200).json({
        message: 'Contacts list Fetched',
        data,
      });
    } catch (error) {
      return next(error);
    }
  },
};
