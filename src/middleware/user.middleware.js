import { appError } from '@/utils';
import { findOrSave } from '@/database/service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import validator from 'validator';

/**
 * Valida a presença do e-mail na requisição
 * e se o e-mail fornecido é um e-mail válido.
 * Retorna um erro caso nenhuma das condições
 * seja atendida. Em caso positivo, localiza
 * o usuário e o anexa na requisição. Caso um
 * usuário não seja encontrado, ele é criado.
 *
 * IMPORTANTE: normalmente os dados do usuário
 * viriam dentro de um JWT porém nossa API é
 * simples e não requer ainda autenticação.
 */
export const get = async (req, res, next) => {
  if (!req.headers.email || !validator.isEmail(req.headers.email)) {
    next(
      appError(
        `${ReasonPhrases.UNPROCESSABLE_ENTITY}: header should contain a valid email`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      ),
    );
    return;
  }

  try {
    const [user] = await findOrSave(req.headers.email);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
