import app from '@/app';
import supertest from 'supertest';
import * as service from '@/database/service/orders.service';
import { buildOrders, buildUser } from 'test/builders';

const request = supertest(app);

jest.mock('@/database/service/orders.service');

describe('Router > Integration > Orders', () => {
  it('should return status 200 and a list of orders', async done => {
    const orders = buildOrders();
    jest.spyOn(service, 'listOrders').mockResolvedValueOnce(orders);

    const res = await request.get('/api/order').set('email', buildUser().email);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ orders });

    done();
  });
});
