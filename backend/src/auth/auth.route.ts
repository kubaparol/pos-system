import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware.js';
import { signIn } from './auth.controller.js';
import { signInValidation } from './auth.validator.js';
import './auth.swagger.js';

const authRouter = Router();

authRouter.post('/sign-in', signInValidation, validateRequest, signIn);

export default authRouter;
