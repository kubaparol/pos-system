import cookieParser from 'cookie-parser';
import express from 'express';

import authRouter from './auth/auth.route';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';
import productsRouter from './products/products.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
