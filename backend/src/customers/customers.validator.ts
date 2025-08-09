import { query } from 'express-validator';

export const getCustomerByPhoneValidation = [
  query('phone')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .blacklist('<>')
    .escape(),
];
