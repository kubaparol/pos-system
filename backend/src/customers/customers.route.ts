import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware';
import { getCustomerByPhone } from './customers.controller';
import { getCustomerByPhoneValidation } from './customers.validator';

const customersRouter = Router();

customersRouter.get(
  '/search',
  getCustomerByPhoneValidation,
  validateRequest,
  getCustomerByPhone,
);

export default customersRouter;
