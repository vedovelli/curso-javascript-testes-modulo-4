const { appError } = require('@/utils');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { get } = require('./user.middleware');
import * as service from '@/database/service';

jest.mock('@/database/service');

describe('Middleware > User', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should forward an error when an email is NOT provided in the headers', () => {
    const req = { headers: {} };
    const next = jest.fn().mockName('next');
    const error = appError(
      `${ReasonPhrases.UNPROCESSABLE_ENTITY}: header should contain a valid email`,
      StatusCodes.UNPROCESSABLE_ENTITY,
    );

    get(req, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should forward an error when an email is provided in the headers but is invalid', () => {
    const req = {
      headers: {
        email: 'vedovelli @gmail.com',
      },
    };
    const next = jest.fn().mockName('next');
    const error = appError(
      `${ReasonPhrases.UNPROCESSABLE_ENTITY}: header should contain a valid email`,
      StatusCodes.UNPROCESSABLE_ENTITY,
    );

    get(req, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return an user object given a valid email is provided', async () => {
    const email = 'vedovelli@gmail.com';
    const req = {
      headers: {
        email,
      },
    };
    const next = jest.fn().mockName('next');

    jest.spyOn(service, 'findOrSave').mockResolvedValueOnce([
      {
        id: 1,
        email,
      },
    ]);

    await get(req, null, next);

    expect(req.user).toBeDefined();
    expect(req.user).toEqual({
      id: 1,
      email,
    });
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(/*nothing*/);
  });

  it('should forward an error when service.findOrSave fails', async () => {
    const email = 'vedovelli@gmail.com';
    const req = {
      headers: {
        email,
      },
    };
    const next = jest.fn().mockName('next');

    jest.spyOn(service, 'findOrSave').mockRejectedValueOnce('Um erro qualquer');

    await get(req, null, next);

    expect(req.user).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith('Um erro qualquer');
  });
});
