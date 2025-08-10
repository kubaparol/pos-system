import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware';
import { finalizeOrder, listOrders } from './orders.controller';
import {
  finalizeOrderValidation,
  listOrdersValidation,
} from './orders.validator';
import './orders.swagger';

const ordersRouter = Router();

ordersRouter.get('/', listOrdersValidation, validateRequest, listOrders);

ordersRouter.post(
  '/finalize',
  finalizeOrderValidation,
  validateRequest,
  finalizeOrder,
);

export default ordersRouter;
