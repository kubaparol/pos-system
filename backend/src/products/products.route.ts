import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware.js';
import {
  archiveProduct,
  createProduct,
  getProductById,
  listProducts,
  restoreProduct,
  updateProduct,
} from './products.controller.js';
import {
  createProductValidation,
  listProductsValidation,
  updateProductValidation,
} from './products.validator.js';
import './products.swagger.js';

const productsRouter = Router();

productsRouter.get('/', listProductsValidation, validateRequest, listProducts);

productsRouter.get('/:id', getProductById);

productsRouter.post(
  '/',
  createProductValidation,
  validateRequest,
  createProduct,
);

productsRouter.patch(
  '/:id',
  updateProductValidation,
  validateRequest,
  updateProduct,
);

productsRouter.post('/:id/archive', archiveProduct);

productsRouter.post('/:id/restore', restoreProduct);

export default productsRouter;
