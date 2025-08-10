import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware.js';
import { getCustomerByPhone } from './customers.controller.js';
import { getCustomerByPhoneValidation } from './customers.validator.js';
import './customers.swagger.js';

const customersRouter = Router();

customersRouter.get(
  '/search',
  getCustomerByPhoneValidation,
  validateRequest,
  getCustomerByPhone,
);

export default customersRouter;
