import { body, query } from 'express-validator';

export const listProductsValidation = [
  query('q').optional().isString().trim().blacklist('<>').escape(),
  query('category').optional().isString().trim().blacklist('<>').escape(),
  query('archived')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('archived must be true or false'),
  query('stock')
    .optional()
    .isIn(['0', 'gt0'])
    .withMessage('stock must be one of: 0, gt0'),
];

export const createProductValidation = [
  body('title').isString().trim().isLength({ min: 1 }).blacklist('<>').escape(),
  body('category')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('description')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('imageUrl')
    .optional()
    .trim()
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
    }),
  body('price').isFloat({ min: 0 }),
  body('stockQuantity').optional().isInt({ min: 0 }),
  body('isArchived').optional().isBoolean(),
  body('reviewRating').optional().isFloat({ min: 0 }),
  body('reviewCount').optional().isInt({ min: 0 }),
];

export const updateProductValidation = [
  body('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('category')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('imageUrl')
    .optional()
    .trim()
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
    }),
  body('price').optional().isFloat({ min: 0 }),
  body('stockQuantity').optional().isInt({ min: 0 }),
  body('isArchived').optional().isBoolean(),
  body('reviewRating').optional().isFloat({ min: 0 }),
  body('reviewCount').optional().isInt({ min: 0 }),
];
