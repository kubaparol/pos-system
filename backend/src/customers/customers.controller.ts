import { NextFunction, Request, Response } from 'express';

import { prisma } from '../config/db';

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

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const customer = await prisma.customer.create({
      data: { firstName, lastName, phone },
    });

    res
      .status(201)
      .json({ data: customer, message: 'Customer created', success: true });
  } catch (error) {
    next(error);
  }
};

export const upsertCustomerByPhone = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const customer = await prisma.customer.upsert({
      create: { firstName, lastName, phone },
      update: { firstName, lastName },
      where: { phone },
    });

    res.status(200).json({ data: customer, success: true });
  } catch (error) {
    next(error);
  }
};
