import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import authRouter from './auth/auth.route';
import customersRouter from './customers/customers.route';
import ordersRouter from './orders/orders.route';
import productsRouter from './products/products.route';
import { env } from './shared/config/env';
import { authorize } from './shared/middlewares/auth.middleware';
import { errorMiddleware } from './shared/middlewares/error.middleware';

const app = express();

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  }),
);

app.use(
  rateLimit({
    legacyHeaders: false,
    max: 100,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    windowMs: 15 * 50 * 1000,
  }),
);

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
