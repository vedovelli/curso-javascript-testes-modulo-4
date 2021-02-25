import express from 'express';
import { productsController } from '@/controllers';

export default express.Router().get('/', productsController.index);
