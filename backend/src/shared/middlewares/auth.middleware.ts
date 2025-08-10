import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };

    (req as Request & { userId: string }).userId = payload.userId;

    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized', success: false });
  }
};
