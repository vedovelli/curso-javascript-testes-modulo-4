import { appError } from '@/utils';
import { Order } from '@/database/models/order.model';
import { logger } from '@/utils';

export async function listOrders(userid) {
  try {
    const where = {
      userid,
    };
    return await Order.findAll({ where });
  } catch (error) {
    return Promise.reject(appError('Failed to retrieve orders'));
  }
}

export async function saveOrder(data) {
  if (!data) {
    logger.error(`Failed to save order. No data provided.`);
    return Promise.reject(appError('Failed to save order'));
  }
  logger.info(`New order saved`, { data });
  return await Order.create(data);
}
