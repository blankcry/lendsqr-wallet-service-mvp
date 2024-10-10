import {Request, Response, NextFunction} from 'express';
import {userCreationRequestSchema} from './schema';
import {UserCreationDTO} from './interface';
import userService from './user.service';

export default {
  create: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload = request.body;
      const value: UserCreationDTO =
        await userCreationRequestSchema.validateAsync(payload);
      const data = await userService.createUser(value);
      return response.status(201).json({
        message: 'User Created Successfully',
        data,
      });
    } catch (error) {
      return next(error);
    }
  },
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {id} = request.user;
      const data = await userService.getContacts(id);
      return response.status(201).json({
        message: 'Transferrable Customer List',
        data,
      });
    } catch (error) {
      return next(error);
    }
  },
};
