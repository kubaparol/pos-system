import { NextFunction, Request, Response } from 'express';

import { prisma } from '../shared/config/db.js';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as Request & { userId: string }).userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    const user = await prisma.user.findUnique({
      select: {
        createdAt: true,
        email: true,
        id: true,
        updatedAt: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found', success: false });
    }

    res.status(200).json({
      data: user,
      message: 'User retrieved successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
