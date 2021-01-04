import { logger } from '@/utils';
import { StatusCodes } from 'http-status-codes';

/**
 * Este método encapsula o envio dos erros de
 * validação ao cliente e nos permite logar os
 * erros para futura avaliação.
 */
export const validationResponse = (res, errors) => {
  const errorList = errors.array();
  logger.error('Validation failure', { errors: errorList });
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorList });
};
