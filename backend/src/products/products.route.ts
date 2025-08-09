import { Router } from 'express';

import { validateRequest } from '../middlewares/validation.middleware';
import {
  archiveProduct,
  createProduct,
  getProductById,
  listProducts,
  restoreProduct,
  updateProduct,
} from './products.controller';
import {
  createProductValidation,
  listProductsValidation,
  updateProductValidation,
} from './products.validator';

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
