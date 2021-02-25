/**
 * Os Cotrollers servem diretamente às rotas e usam os
 * Services para armazenar os dados. São responsáveis
 * por validar o input e retornar erros de validação
 * ou o resultado das operações bem sucedidas no DB.
 */
export * as homeController from './home.controller';
export * as ordersController from './orders.controller';
export * as productsController from './products.controller';
