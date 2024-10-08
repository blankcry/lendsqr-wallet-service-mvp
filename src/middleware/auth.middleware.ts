import {NextFunction, Request, Response} from 'express';
import {isString} from 'lodash';

/**
 * Middleware that validates api key for a user.
 * @param {Request} request The Express request object.
 * @param {Response} response The Express response object.
 * @param {NextFunction} next The next middleware function in the stack.
 */
export const validateTokem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const secret = request.headers['Authorization'];
    console.log('Token', secret);
    if (!secret || !isString(secret)) {
      return response.status(400).json({
        message: 'Please supply a user token.',
      });
    }

    // Get user profile via token

    // Inject it into request object

    return next();
  } catch (error) {
    return next(error);
  }
};
