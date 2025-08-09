import cookieParser from 'cookie-parser';
import express from 'express';

import authRouter from './auth/auth.route';
import customersRouter from './customers/customers.route';
import ordersRouter from './orders/orders.route';
import productsRouter from './products/products.route';
import { env } from './shared/config/env';
import { errorMiddleware } from './shared/middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
