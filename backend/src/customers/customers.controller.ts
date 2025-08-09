import { NextFunction, Request, Response } from 'express';

import { prisma } from '../shared/config/db';

export const getCustomerByPhone = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const phoneParam = req.query.phone;
    const phone = typeof phoneParam === 'string' ? phoneParam : undefined;

    if (!phone) {
      return res
        .status(400)
        .json({ error: 'phone is required', success: false });
    }

    const customer = await prisma.customer.findUniqueOrThrow({
      where: { phone },
    });

    res.status(200).json({ data: customer, success: true });
  } catch (error) {
    next(error);
  }
};
