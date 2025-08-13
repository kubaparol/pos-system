import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware.js';
import { getDashboardStats } from './dashboard.controller.js';
import { getDashboardStatsValidation } from './dashboard.validator.js';
import './dashboard.swagger.js';

const dashboardRouter = Router();

dashboardRouter.get(
  '/stats',
  getDashboardStatsValidation,
  validateRequest,
  getDashboardStats,
);

export default dashboardRouter;
