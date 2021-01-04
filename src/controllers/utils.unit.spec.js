import { logger } from '@/utils/logger';
import { StatusCodes } from 'http-status-codes';
import { buildRes } from 'test/builders';
import { validationResponse } from './utils';

jest.mock('@/utils/logger');

describe('Controllers > utils', () => {
  it('should call res.status and res.json with proper data', () => {
    const res = buildRes();
    const errors = {
      array: jest
        .fn()
        .mockReturnValueOnce(['error1', 'error2'])
        .mockName('errors.array()'),
    };

    validationResponse(res, errors);

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('Validation failure', {
      errors: ['error1', 'error2'],
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['error1', 'error2'],
    });
    expect(errors.array).toHaveBeenCalledTimes(1);
  });
});
