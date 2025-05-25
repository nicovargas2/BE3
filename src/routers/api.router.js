import { Router } from 'express';
import productsRouter from './api/products.router.js';
import mocksRouter from './api/mocks.router.js';
import usersRouter from './api/users.router.js';

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/mocks', mocksRouter);

export default apiRouter;
