import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@/utils';

export const appError = (
  message,
  status = StatusCodes.INTERNAL_SERVER_ERROR,
) => {
  logger.error(message);
  return createError(status, message);
};
