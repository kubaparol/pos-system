import cookieParser from 'cookie-parser';
import express from 'express';

import authRouter from './auth/auth.route';
import customersRouter from './customers/customers.route';
import ordersRouter from './orders/orders.route';
import productsRouter from './products/products.route';
import { env } from './shared/config/env';
import { authorize } from './shared/middlewares/auth.middleware';
import { errorMiddleware } from './shared/middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', authorize, productsRouter);
app.use('/api/customers', authorize, customersRouter);
app.use('/api/orders', authorize, ordersRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
