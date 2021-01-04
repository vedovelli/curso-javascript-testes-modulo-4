import { buildError, buildUser } from 'test/builders';
import { User } from '@/database/models/user.model';
import { listUsers, saveUser, findOrSave } from './users.service';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@/utils/logger';

jest.mock('@/database/models/user.model');
jest.mock('@/utils/logger');

describe('Service > Users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user when findOrSave is executed', async () => {
    const user = buildUser();

    jest.spyOn(User, 'findOrCreate').mockResolvedValueOnce(user);

    const savedUser = await findOrSave(user.email);

    const where = { email: user.email };

    expect(savedUser).toEqual(user);
    expect(User.findOrCreate).toHaveBeenCalledTimes(1);
    expect(User.findOrCreate).toHaveBeenCalledWith({ where });
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      `User located or created with email: ${user.email}`,
    );
  });

  it('should reject with an error when User.findOrCreate() fails', () => {
    const user = buildUser();

    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to retrieve or save user with email: ${user.email}`,
    );

    jest.spyOn(User, 'findOrCreate').mockRejectedValueOnce(error);

    expect(findOrSave(user.email)).rejects.toEqual(error);
    expect(logger.info).not.toHaveBeenCalled();
  });

  it('should return a list of users', async () => {
    const users = [buildUser(), buildUser()];

    jest.spyOn(User, 'findAll').mockResolvedValueOnce(users);

    const returnedUsers = await listUsers();

    expect(returnedUsers).toEqual(users);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(User.findAll).toHaveBeenCalledWith(/* nothing */);
  });

  it('should reject with an error when User.findAll() fails', () => {
    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to retrieve users`,
    );

    jest.spyOn(User, 'findAll').mockRejectedValue(error);

    expect(listUsers()).rejects.toEqual(error);
  });

  it('should save and return user', async () => {
    const data = {
      email: buildUser().email,
    };

    const savedUser = {
      ...data,
      id: 1,
    };

    jest.spyOn(User, 'create').mockResolvedValueOnce(savedUser);

    expect(saveUser(data)).resolves.toEqual(savedUser);
  });

  it('should reject with an error when saveUser is executed without any data', () => {
    const error = buildError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to save user',
    );

    expect(saveUser()).rejects.toEqual(error);
  });
});
