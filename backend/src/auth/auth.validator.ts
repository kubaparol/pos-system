import { body } from 'express-validator';

export const signInValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail()
    .trim()
    .escape(),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
    .trim()
    .escape(),
];
