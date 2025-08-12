import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { prisma } from '../shared/config/db.js';
import { serializeForJson } from '../shared/utils/serialize-for-json.js';

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limitParam = req.query.limit;
    const limit =
      limitParam && typeof limitParam === 'string'
        ? parseInt(limitParam, 10)
        : 5;

    const [kpiStats, recentOrders, stockAlerts, topCustomers, topProducts] =
      await Promise.all([
        getKpiStats(),
        getRecentOrders(limit),
        getStockAlerts(limit),
        getTopCustomers(Math.min(limit, 3)),
        getTopProducts(limit),
      ]);

    const dashboardData = {
      kpi: kpiStats,
      recentOrders,
      stockAlerts,
      topCustomers,
      topProducts,
    };

    res.status(200).json({
      data: serializeForJson(dashboardData),
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

async function calculateTotalRevenue(productId: string) {
  const orderItems = await prisma.orderItem.findMany({
    select: { quantity: true, unitPrice: true },
    where: { productId },
  });

  return orderItems.reduce((total, item) => {
    return total.plus(item.unitPrice.mul(item.quantity));
  }, new Prisma.Decimal(0));
}

async function getKpiStats() {
  const [orderStats, customerCount] = await Promise.all([
    prisma.order.aggregate({
      _avg: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
      _sum: {
        totalAmount: true,
      },
    }),
    prisma.customer.count(),
  ]);

  return {
    averageOrderValue: orderStats._avg.totalAmount ?? new Prisma.Decimal(0),
    totalCustomers: customerCount,
    totalOrders: orderStats._count.id,
    totalRevenue: orderStats._sum.totalAmount ?? new Prisma.Decimal(0),
  };
}

async function getRecentOrders(limit: number) {
  const orders = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });

  return orders.map((order) => ({
    amount: order.totalAmount,
    customerName: `${order.customer.firstName} ${order.customer.lastName}`,
    date: order.createdAt,
    id: order.id,
    orderNumber: `#${order.orderNumber}`,
  }));
}

async function getStockAlerts(limit: number) {
  const lowStockThreshold = 10;

  const alertProducts = await prisma.product.findMany({
    orderBy: {
      stockQuantity: 'asc',
    },
    select: {
      id: true,
      stockQuantity: true,
      title: true,
    },
    take: limit,
    where: {
      isArchived: false,
      stockQuantity: {
        lte: lowStockThreshold,
      },
    },
  });

  return alertProducts.map((product) => ({
    currentStock: product.stockQuantity,
    id: product.id,
    name: product.title,
    status:
      product.stockQuantity === 0
        ? ('out_of_stock' as const)
        : ('low_stock' as const),
  }));
}

async function getTopCustomers(limit: number) {
  const topCustomersQuery = await prisma.order.groupBy({
    _count: {
      id: true,
    },
    _sum: {
      totalAmount: true,
    },
    by: ['customerId'],
    orderBy: {
      _sum: {
        totalAmount: 'desc',
      },
    },
    take: limit,
  });

  const customerIds = topCustomersQuery.map((item) => item.customerId);
  const customers = await prisma.customer.findMany({
    select: {
      firstName: true,
      id: true,
      lastName: true,
    },
    where: {
      id: { in: customerIds },
    },
  });

  const customerMap = new Map(customers.map((c) => [c.id, c]));

  return topCustomersQuery.map((item) => {
    const customer = customerMap.get(item.customerId);
    return {
      id: item.customerId,
      name: customer
        ? `${customer.firstName} ${customer.lastName}`
        : 'Unknown Customer',
      orderCount: item._count.id,
      totalSpent: item._sum.totalAmount ?? new Prisma.Decimal(0),
    };
  });
}

async function getTopProducts(limit: number) {
  const topProductsQuery = await prisma.orderItem.groupBy({
    _sum: {
      quantity: true,
      unitPrice: true,
    },
    by: ['productId'],
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: limit,
  });

  const productIds = topProductsQuery.map((item) => item.productId);
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      id: { in: productIds },
    },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  return Promise.all(
    topProductsQuery.map(async (item) => {
      const product = productMap.get(item.productId);
      return {
        id: item.productId,
        name: product?.title ?? 'Unknown Product',
        quantitySold: item._sum.quantity ?? 0,
        totalRevenue: await calculateTotalRevenue(item.productId),
      };
    }),
  );
}
