import Joi from 'joi';
import {SystemError} from '../error';
import {NextFunction, Request, Response} from 'express';
import {BaseModel} from '@src/db/models/BaseModel';
import {ValidationError} from 'objection';

/**
 * Middleware that catches all unknown routes.
 * @param {Request} _request The Express request object.
 * @param {Response} response The Express response object.
 */
export const NotFoundErrorHandler = async (
  _request: Request,
  response: Response
) => {
  return response.status(404).json({
    status: 'not-found',
    message: 'Unknown Resource Reute',
  });
};

/**
 * Middleware that handles unmanaged errors at the controller level.
 * @param {unknown} error The unknown error object passed when next(error) is called.
 * @param {Request} _request The Express request object.
 * @param {Response} response The Express response object.
 */
export const GlobalErrorHandler = async (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    return response.status(400).json({
      status: 'validation-error',
      message: error.message,
    });
  }
  if (error instanceof Joi.ValidationError) {
    return response.status(400).json({
      status: 'validation-error',
      message: error.message,
    });
  }
  if (error instanceof SystemError) {
    switch (error.name) {
      case 'UnprocessableError':
      case 'BadRequestError':
        return response.status(400).json({
          status: error.code,
          message: error.message,
        });
      case 'NotFoundError':
        return response.status(404).json({
          status: error.code,
          message: error.message,
        });
      case 'UnAuthorizedError':
        return response.status(401).json({
          status: error.code,
          message: error.message,
        });
      case 'ConflictError':
        return response.status(409).json({
          status: error.code,
          message: error.message,
        });
      case 'ServerError':
      case 'SystemError':
      default:
        return response.status(500).json({
          status: error.code,
          message: error.message,
        });
    }
  }

  // Check if Error is DB Error

  return response.status(500).json({
    status: 'server-error',
    message: 'Something went wrong,Server Error',
  });
};
