import { Router } from 'express';

import { validateRequest } from '../shared/middlewares/validation.middleware';
import { signIn } from './auth.controller';
import { signInValidation } from './auth.validator';

const authRouter = Router();

authRouter.post('/sign-in', signInValidation, validateRequest, signIn);

export default authRouter;
