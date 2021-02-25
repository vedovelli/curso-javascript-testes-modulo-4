import homeRouter from './home.router';
import ordersRouter from './orders.router';
import productsRouter from './products.router';
import { serviceMiddleware, userMiddleware } from '@/middleware';

const routers = [{ '/': homeRouter }, { '/order': ordersRouter }];

const middlewares = [serviceMiddleware.get, userMiddleware.get];

export function attachRouters(app) {
  /**
   * products route está fora do loop abaixo para não
   * receber os middlewares. Na prática ela é uma rota pública
   */
  app.use('/api/products', productsRouter);

  for (const routerObj of routers) {
    const [resource, router] = Object.entries(routerObj)[0];
    //.....👇🏻 /api/order
    app.use(`/api${resource}`, middlewares, router);
  }
}
