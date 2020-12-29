import { appError } from '@/utils';
import { findOrSave } from '@/database/service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import validator from 'validator';

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
  const [user] = await findOrSave(req.headers.email);
  req.user = user;
  next();
};
