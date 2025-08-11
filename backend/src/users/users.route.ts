import { Router } from 'express';

import { authorize } from '../shared/middlewares/auth.middleware.js';
import { getCurrentUser } from './users.controller.js';
import './users.swagger.js';

const usersRouter = Router();

usersRouter.get('/me', authorize, getCurrentUser);

export default usersRouter;
