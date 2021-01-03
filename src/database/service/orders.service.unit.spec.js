import { buildError, buildOrders, buildUser } from 'test/builders';
import { Order } from '@/database/models/order.model';
import { listOrders } from './orders.service';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/database/models/order.model');
JSON.parse = jest.fn();

describe('Service > Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of orders', async () => {
    const user = buildUser();

    const where = {
      userid: user.id,
    };

    const orders = buildOrders().map(order => {
      order.products = JSON.stringify(order.products);
      return order;
    });

    jest.spyOn(Order, 'findAll').mockResolvedValueOnce(orders);

    const returnedOrders = await listOrders(user.id);

    expect(returnedOrders).toEqual(orders);
    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(Order.findAll).toHaveBeenCalledWith({ where });
    expect(JSON.parse).toHaveBeenCalledTimes(3);
  });

  it('should reject with an error when Order.findAll() fails', () => {
    const user = buildUser();
    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to retrieve orders for user: ${user.id}`,
    );

    jest.spyOn(Order, 'findAll').mockRejectedValue(error);

    expect(listOrders(user.id)).rejects.toEqual(error);
  });
});
