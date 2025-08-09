import { body, query } from 'express-validator';

export const finalizeOrderValidation = [
  body('customer.phone')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .blacklist('<>')
    .escape(),
  body('customer.firstName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('customer.lastName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isString().isUUID(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('note').optional().isString().trim().isLength({ max: 2000 }).escape(),
];

export const listOrdersValidation = [
  query('q').optional().isString().trim().blacklist('<>').escape(),
];
