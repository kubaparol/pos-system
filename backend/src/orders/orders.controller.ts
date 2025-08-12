import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { prisma } from '../shared/config/db.js';
import { serializeForJson } from '../shared/utils/serialize-for-json.js';

interface FinalizeOrderItemInput {
  productId: string;
  quantity: number;
}

interface FinalizeOrderRequestBody {
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  items: FinalizeOrderItemInput[];
  note?: string;
}

export const finalizeOrder = async (
  req: Request<unknown, unknown, FinalizeOrderRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { customer, items, note } = req.body;

    // Normalize inputs
    const uniqueProductIds = Array.from(new Set(items.map((i) => i.productId)));

    const products = await prisma.product.findMany({
      where: { id: { in: uniqueProductIds } },
    });

    const productIdToProduct = new Map(products.map((p) => [p.id, p]));

    const invalidItems: {
      productId: string;
      reason:
        | 'ARCHIVED'
        | 'INSUFFICIENT_STOCK'
        | 'INVALID_QUANTITY'
        | 'NOT_FOUND'
        | 'OUT_OF_STOCK';
    }[] = [];

    for (const item of items) {
      const product = productIdToProduct.get(item.productId);

      if (!product) {
        invalidItems.push({ productId: item.productId, reason: 'NOT_FOUND' });
        continue;
      }

      if (item.quantity <= 0) {
        invalidItems.push({
          productId: item.productId,
          reason: 'INVALID_QUANTITY',
        });

        continue;
      }

      if (product.isArchived) {
        invalidItems.push({ productId: item.productId, reason: 'ARCHIVED' });

        continue;
      }

      if (product.stockQuantity <= 0) {
        invalidItems.push({
          productId: item.productId,
          reason: 'OUT_OF_STOCK',
        });

        continue;
      }

      if (item.quantity > product.stockQuantity) {
        invalidItems.push({
          productId: item.productId,
          reason: 'INSUFFICIENT_STOCK',
        });
      }
    }

    if (invalidItems.length > 0) {
      return res.status(409).json({
        details: { invalidItems },
        error: 'Cart contains invalid items',
        success: false,
      });
    }

    const order = await prisma.$transaction(async (tx) => {
      // Upsert customer by phone and update names if changed
      const upsertedCustomer = await tx.customer.upsert({
        create: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
        },
        update: {
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
        where: { phone: customer.phone },
      });

      // Re-read products within the transaction to ensure fresh values
      const txProducts = await tx.product.findMany({
        where: { id: { in: uniqueProductIds } },
      });

      const txProductMap = new Map(txProducts.map((p) => [p.id, p]));

      // Concurrency-safe stock decrement using updateMany with guards
      for (const item of items) {
        const p = txProductMap.get(item.productId);

        if (!p) {
          throw new Error('Product not found during transaction');
        }

        const updateCount = await tx.product.updateMany({
          data: { stockQuantity: { decrement: item.quantity } },
          where: {
            id: item.productId,
            isArchived: false,
            stockQuantity: { gte: item.quantity },
          },
        });

        if (updateCount.count !== 1) {
          throw new Error('Insufficient stock during finalization');
        }
      }

      // Compute total using Decimal math
      let totalAmount = new Prisma.Decimal(0);
      for (const item of items) {
        const p = txProductMap.get(item.productId)!;
        // p.price is Prisma.Decimal
        totalAmount = totalAmount.plus(p.price.mul(item.quantity));
      }

      const createdOrder = await tx.order.create({
        data: {
          customerId: upsertedCustomer.id,
          items: {
            create: items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: txProductMap.get(i.productId)!.price,
            })),
          },
          note: note ?? null,
          totalAmount,
        },
        include: {
          customer: true,
          items: { include: { product: true } },
        },
      });

      return { ...createdOrder, orderNumber: createdOrder.id };
    });

    res.status(201).json({
      data: serializeForJson(order),
      message: 'Order finalized',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const qParam = req.query.q;
    const q = typeof qParam === 'string' ? qParam.trim() : undefined;

    let where = {};

    if (q && q.length > 0) {
      const digitsOnly = q.replace(/\D/g, '');
      if (digitsOnly.length >= 3) {
        // Treat as phone fragment
        where = {
          customer: {
            phone: { contains: digitsOnly },
          },
        };
      } else {
        // Name fragment, case-insensitive
        where = {
          OR: [
            { customer: { firstName: { contains: q, mode: 'insensitive' } } },
            { customer: { lastName: { contains: q, mode: 'insensitive' } } },
          ],
        };
      }
    }

    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      where,
    });

    res.status(200).json({ data: serializeForJson(orders), success: true });
  } catch (error) {
    next(error);
  }
};
