import { NextFunction, Request, Response } from 'express';

import { prisma } from '../shared/config/db';

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryParam = req.query.category;
    const qParam = req.query.q;
    const archivedParam = req.query.archived as string | undefined;

    const category =
      typeof categoryParam === 'string' ? categoryParam : undefined;
    const q = typeof qParam === 'string' ? qParam : undefined;
    const archived = archivedParam === 'true';

    const where = {
      isArchived: archived,
      ...(category ? { category } : {}),
      ...(q
        ? {
            title: {
              contains: q,
              mode: 'insensitive' as const,
            },
          }
        : {}),
    };

    const products = await prisma.product.findMany({
      orderBy: { title: 'asc' },
      where,
    });

    res.status(200).json({ data: products, success: true });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });

    res.status(200).json({ data: product, success: true });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      category,
      description,
      isArchived = false,
      price,
      reviewCount = 0,
      reviewRating = 0,
      stockQuantity = 0,
      title,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        category,
        description,
        isArchived,
        price,
        reviewCount,
        reviewRating,
        stockQuantity,
        title,
      },
    });

    res
      .status(201)
      .json({ data: product, message: 'Product created', success: true });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const {
      category,
      description,
      imageUrl,
      isArchived,
      price,
      reviewCount,
      reviewRating,
      stockQuantity,
      title,
    } = req.body;

    const product = await prisma.product.update({
      data: {
        ...(category !== undefined ? { category } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(stockQuantity !== undefined ? { stockQuantity } : {}),
        ...(isArchived !== undefined ? { isArchived } : {}),
        ...(reviewRating !== undefined ? { reviewRating } : {}),
        ...(reviewCount !== undefined ? { reviewCount } : {}),
      },
      where: { id },
    });

    res
      .status(200)
      .json({ data: product, message: 'Product updated', success: true });
  } catch (error) {
    next(error);
  }
};

export const archiveProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      data: { isArchived: true },
      where: { id },
    });

    res
      .status(200)
      .json({ data: product, message: 'Product archived', success: true });
  } catch (error) {
    next(error);
  }
};

export const restoreProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      data: { isArchived: false },
      where: { id },
    });

    res
      .status(200)
      .json({ data: product, message: 'Product restored', success: true });
  } catch (error) {
    next(error);
  }
};
