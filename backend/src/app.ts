import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import authRouter from './auth/auth.route.js';
import customersRouter from './customers/customers.route.js';
import dashboardRouter from './dashboard/dashboard.route.js';
import ordersRouter from './orders/orders.route.js';
import productsRouter from './products/products.route.js';
import { env } from './shared/config/env.js';
import { specs, swaggerUi } from './shared/config/swagger.js';
import { authorize } from './shared/middlewares/auth.middleware.js';
import { errorMiddleware } from './shared/middlewares/error.middleware.js';
import usersRouter from './users/users.route.js';

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use('/api/customers', authorize, customersRouter);
app.use('/api/orders', authorize, ordersRouter);
app.use('/api/products', authorize, productsRouter);
app.use('/api/dashboard', authorize, dashboardRouter);
app.use('/api/users', authorize, usersRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
