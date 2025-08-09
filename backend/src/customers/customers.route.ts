import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware';
import {
  createCustomer,
  getCustomerByPhone,
  upsertCustomerByPhone,
} from './customers.controller';
import {
  createCustomerValidation,
  getCustomerByPhoneValidation,
  upsertCustomerByPhoneValidation,
} from './customers.validator';

const customersRouter = Router();

customersRouter.get(
  '/search',
  getCustomerByPhoneValidation,
  validateRequest,
  getCustomerByPhone,
);

customersRouter.post(
  '/',
  createCustomerValidation,
  validateRequest,
  createCustomer,
);

customersRouter.post(
  '/upsert-by-phone',
  upsertCustomerByPhoneValidation,
  validateRequest,
  upsertCustomerByPhone,
);

export default customersRouter;
