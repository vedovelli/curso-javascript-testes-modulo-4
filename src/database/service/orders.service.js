import { appError } from '@/utils';
import { Order } from '@/database/models/order.model';
import { logger } from '@/utils';

export async function listOrders(userid) {
  try {
    const where = {
      userid,
    };

    return (await Order.findAll({ where })).map(order => {
      order.products = JSON.parse(order.products);
      return order;
    });
  } catch (error) {
    /**
     * Ao rejeitar a Promise com um erro, este será
     * capturado no controller que então o encaminhará
     * no método next(), fazendo com que ultimamente
     * ele chegue no gerenciador central de erros e
     * de volta ao client que fez a requisição.
     */
    return Promise.reject(
      appError(`Failed to retrieve orders for user: ${userid}`),
    );
  }
}

export async function saveOrder(data) {
  if (!data) {
    return Promise.reject(appError('Failed to save order'));
  }
  logger.info(`New order saved`, { data });
  return await Order.create(data);
}
