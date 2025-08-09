import { body, param, query } from 'express-validator';

export const getCustomerByPhoneValidation = [
  query('phone')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .blacklist('<>')
    .escape(),
];

export const createCustomerValidation = [
  body('phone').isString().trim().isLength({ min: 3 }).blacklist('<>').escape(),
  body('firstName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('lastName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
];

export const updateCustomerValidation = [
  param('id').isUUID(),
  body('phone')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .blacklist('<>')
    .escape(),
  body('firstName')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('lastName')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
];

export const upsertCustomerByPhoneValidation = [
  body('phone').isString().trim().isLength({ min: 3 }).blacklist('<>').escape(),
  body('firstName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
  body('lastName')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>')
    .escape(),
];
