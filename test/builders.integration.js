import * as service from '@/database/service';
import app from '@/app';
import supertest from 'supertest';
import { buildUser } from './builders';

jest.mock('@/database/service');

export function buildCall(endpoint, method = 'get', body = null) {
  const user = buildUser();
  const request = supertest(app);

  jest.spyOn(service, 'findOrSave').mockResolvedValue([user]);

  return request[method](endpoint).send(body).set('email', user.email);
}
