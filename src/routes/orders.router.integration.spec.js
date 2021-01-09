import * as service from '@/database/service';
import { buildOrders } from 'test/builders';
import { buildCall } from 'test/builders.integration';

jest.mock('@/database/service');

describe('Router > Integration > Orders', () => {
  it('should return status 200 and a list of orders', async done => {
    const orders = buildOrders();

    jest.spyOn(service, 'listOrders').mockResolvedValueOnce(orders);

    const res = await buildCall('/api/order');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ orders });

    done();
  });
});
