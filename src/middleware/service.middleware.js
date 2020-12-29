import * as service from '@/database/service';

export const get = (req, res, next) => {
  req.service = service;
  next();
};
