import express from 'express';
import { orderController } from '@/controllers';

export default express
  .Router()
  .get('/', orderController.index)
  .post('/', orderController.validate('create'), orderController.create);
