import createError from 'http-errors';
import { appError } from './errors';
import { logger } from './logger';
import { StatusCodes } from 'http-status-codes';

jest.mock('./logger');
jest.mock('http-errors');

describe('Utils > Errors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute logger.error', () => {
    appError('Error message');

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('Error message');
  });

  it('should execute createError with message and default status code', () => {
    appError('Error message');

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Error message',
    );
  });

  it('should execute createError with message and provided status code', () => {
    appError('Error message', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'Error message',
    );
  });
});
