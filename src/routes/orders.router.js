import express from 'express';
import { ordersController } from '@/controllers';

export default express
  .Router()
  .get('/', ordersController.index)
  .post('/', ordersController.validate('create'), ordersController.create);
