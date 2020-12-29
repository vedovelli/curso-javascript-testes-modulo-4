import { logger } from '@/utils';
import { StatusCodes } from 'http-status-codes';

export const validationResponse = (res, errors) => {
  logger.error('Validation failure', { errors: errors.array() });
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
};
