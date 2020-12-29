import { logger } from '@/utils';
import { StatusCodes } from 'http-status-codes';

/**
 * Este método encapsula o envio dos erros de
 * validação ao cliente e nos permite logar os
 * erros para futura avaliação.
 */
export const validationResponse = (res, errors) => {
  logger.error('Validation failure', { errors: errors.array() });
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
};
