import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@/utils';

/**
 * Esta função encapsula a criação de erros para que
 * todo e qualquer erro criado com appError() seja
 * também logado tanto localmente, quanto no console
 * e também num futuro serviço como Datadog ou Logly
 */
export const appError = (
  message,
  status = StatusCodes.INTERNAL_SERVER_ERROR,
) => {
  logger.error(message);
  return createError(status, message);
};
