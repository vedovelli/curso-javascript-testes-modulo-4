import { body, validationResult } from 'express-validator';
import { validationResponse } from './utils';

export async function index(req, res, next) {
  try {
    const orders = await req.service.listOrders(req.user.id);
    res.status(200).json({ orders });
  } catch (error) {
    /**
     * Os erros passados para o método next() serão capturados
     * pelo gerenciador global de erros (ver app.js) e chegarão
     * no client que fez a requisição
     */
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      validationResponse(res, errors);
      return;
    }

    const data = {
      userid: req.user.id,
      products: JSON.stringify(req.body.products),
    };

    const order = await req.service.saveOrder(data);

    res.status(200).json({ order: { id: order.id } });
  } catch (error) {
    next(error);
  }
}

/**
 * Este método é executado na rota como um middleware.
 * Ver orders.router.js.
 */
export const validate = method => {
  switch (method) {
    case 'create': {
      return [body('products', `Please provide a list of products`).exists()];
    }
    default:
      throw new Error('Please provide a valid method name');
  }
};
