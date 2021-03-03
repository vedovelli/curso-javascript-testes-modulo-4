import { StatusCodes } from 'http-status-codes';
import { buildReq, buildRes } from 'test/builders';
import { index } from './products.controller';
import products from 'test/stubs/products.json';

describe('Controllers > Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 with a list of orders', async () => {
    const req = buildReq();
    const res = buildRes();

    await index(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ products });
  });
});
