import { Router } from 'express';

import { validateRequest } from '../middlewares/validation.middleware';
import { finalizeOrder, listOrders } from './orders.controller';
import {
  finalizeOrderValidation,
  listOrdersValidation,
} from './orders.validator';

const ordersRouter = Router();

ordersRouter.get('/', listOrdersValidation, validateRequest, listOrders);

ordersRouter.post(
  '/finalize',
  finalizeOrderValidation,
  validateRequest,
  finalizeOrder,
);

export default ordersRouter;
