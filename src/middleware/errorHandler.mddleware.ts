import {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';
import { config } from '../config';

/**
 * Capture unhandled errors
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {void|Response}
 */
export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void|Response {
  if (!err) {
    return next();
  }

  logger.error(err.message, err);

  return res.status(500).json({
    status: 'failed',
    error: {
      code: config.NODE_ENV === 'production' ?
        'internal-server-error' :
        err.name,
      message: err.message,
    },
  });
}