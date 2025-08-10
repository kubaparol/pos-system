import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware.js';
import { finalizeOrder, listOrders } from './orders.controller.js';
import {
  finalizeOrderValidation,
  listOrdersValidation,
} from './orders.validator.js';
import './orders.swagger.js';

const ordersRouter = Router();

ordersRouter.get('/', listOrdersValidation, validateRequest, listOrders);

ordersRouter.post(
  '/finalize',
  finalizeOrderValidation,
  validateRequest,
  finalizeOrder,
);

export default ordersRouter;
