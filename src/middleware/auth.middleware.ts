import userService from '../modules/user/user.service';
import {NextFunction, Request, Response} from 'express';
import {isString} from 'lodash';

/**
 * Middleware that validates api key for a user.
 * @param {Request} request The Express request object.
 * @param {Response} response The Express response object.
 * @param {NextFunction} next The next middleware function in the stack.
 */
export const validateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];

    // Ensure the Authorization header is present and is a string
    if (!authHeader || !isString(authHeader)) {
      return response.status(401).json({
        message: 'Authorization header is missing or malformed.',
      });
    }

    // Ensure the token follows the "Bearer <token>" format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return response.status(401).json({
        message: 'Token format is incorrect. Expected "Bearer <token>".',
      });
    }

    const token = parts[1];
    if (!token) {
      return response.status(401).json({
        message: 'Token not found in the authorization header.',
      });
    }

    // Get user profile via token
    const user = await userService.findUserViaToken(token);

    if (!user) {
      return response.status(401).json({
        message: 'Invalid or expired token.',
      });
    }

    // Attach user to the request object
    request.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
