import { query } from 'express-validator';

export const getDashboardStatsValidation = [
  query('limit')
    .optional()
    .isInt({ max: 20, min: 1 })
    .withMessage('Limit must be an integer between 1 and 20'),
];
