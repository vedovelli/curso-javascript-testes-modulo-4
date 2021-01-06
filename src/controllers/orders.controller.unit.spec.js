import { StatusCodes } from 'http-status-codes';
import {
  buildError,
  buildNext,
  buildOrder,
  buildOrders,
  buildReq,
  buildRes,
} from 'test/builders';
import { create, index, validate } from './orders.controller';
import * as validator from 'express-validator';
import { validationResponse } from './utils';

jest.mock('express-validator');
jest.mock('./utils');

JSON.stringify = jest.fn();

describe('Controllers > Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 with a list of orders', async () => {
    const req = buildReq();
    const res = buildRes();
    const next = buildNext();
    const orders = buildOrders();

    jest.spyOn(req.service, 'listOrders').mockResolvedValueOnce(orders);

    await index(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ orders });

    expect(req.service.listOrders).toHaveBeenCalledTimes(1);
    expect(req.service.listOrders).toHaveBeenCalledWith(req.user.id);
  });

  it('should forward an error when service.listOrder fails', async () => {
    const req = buildReq();
    const res = buildRes();
    const next = buildNext();
    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Some message here!',
    );

    jest.spyOn(req.service, 'listOrders').mockRejectedValueOnce(error);

    await index(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should build a list of errors', () => {
    const method = 'create';
    const existsFn = jest
      .fn()
      .mockReturnValueOnce('Please provide a list of products');

    jest.spyOn(validator, 'body').mockReturnValueOnce({
      exists: existsFn,
    });

    const errors = validate(method);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(['Please provide a list of products']);

    expect(validator.body).toHaveBeenCalledTimes(1);
    expect(validator.body).toHaveBeenCalledWith(
      'products',
      `Please provide a list of products`,
    );
  });

  it('should throw an error when an unknown method is provided', () => {
    expect(() => {
      validate('some unknown method');
    }).toThrowError('Please provide a valid method name');
  });

  it('should return status 200 and the created order id', async () => {
    const products = buildOrder();
    const req = buildReq({
      body: { products },
    });
    const res = buildRes();
    const next = buildNext();
    const isEmpty = jest.fn().mockReturnValueOnce(true);

    jest.spyOn(validator, 'validationResult').mockReturnValueOnce({
      isEmpty,
    });

    jest.spyOn(req.service, 'saveOrder').mockResolvedValueOnce({
      id: 123456,
    });

    await create(req, res, next);

    expect(isEmpty).toHaveBeenCalledTimes(1);

    expect(JSON.stringify).toHaveBeenCalledTimes(1);
    expect(JSON.stringify).toHaveBeenCalledWith(products);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ order: { id: 123456 } });

    expect(req.service.saveOrder).toHaveBeenCalledTimes(1);
    expect(req.service.saveOrder).toHaveBeenCalledWith({
      userid: req.user.id,
      products: JSON.stringify(products),
    });
  });

  it('should forward an error when service.saveOrder fails', async () => {
    const products = buildOrder();
    const req = buildReq({
      body: { products },
    });
    const res = buildRes();
    const next = buildNext();
    const isEmpty = jest.fn().mockReturnValueOnce(true);
    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Some error here',
    );

    jest.spyOn(validator, 'validationResult').mockReturnValueOnce({
      isEmpty,
    });

    jest.spyOn(req.service, 'saveOrder').mockRejectedValueOnce(error);

    await create(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return validation response when error bag is not empty', async () => {
    const req = buildReq();
    const res = buildRes();
    const next = buildNext();
    const errorBag = {
      isEmpty: jest.fn().mockReturnValueOnce(false),
      array: jest.fn().mockReturnValueOnce(['error1', 'error2']),
    };

    jest.spyOn(validator, 'validationResult').mockReturnValueOnce(errorBag);

    expect(await create(req, res, next)).toBeUndefined();

    expect(validationResponse).toHaveBeenCalledTimes(1);
    expect(validationResponse).toHaveBeenCalledWith(res, errorBag);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
