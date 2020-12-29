import * as service from '@/database/service';

/**
 * MIDDLEWARES PARA AS ROTAS
 * Disponibiliza todos os services da aplicação
 * diretamente na requisição, facilitando tanto
 * o uso na aplicação quanto mocks no testes.
 */
export const get = (req, res, next) => {
  req.service = service;
  next();
};
