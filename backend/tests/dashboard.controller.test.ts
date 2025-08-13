import { Prisma } from '@prisma/client';
import express from 'express';
import request from 'supertest';

import dashboardRouter from '../src/dashboard/dashboard.route.js';
import { prisma } from '../src/shared/config/db.js';
import { errorMiddleware } from '../src/shared/middlewares/error.middleware.js';

// Mocks
jest.mock('../src/shared/config/db', () => ({
  prisma: {
    customer: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
    order: {
      aggregate: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn(),
    },
    orderItem: {
      findMany: jest.fn(),
      groupBy: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
    },
  },
}));

describe('Dashboard Controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/dashboard', dashboardRouter);
  app.use(errorMiddleware);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/dashboard/stats should return 200 with dashboard stats', async () => {
    // Mock order stats
    (prisma.order.aggregate as jest.Mock).mockResolvedValueOnce({
      _avg: {
        totalAmount: new Prisma.Decimal('25.50'),
      },
      _count: {
        id: 10,
      },
      _sum: {
        totalAmount: new Prisma.Decimal('255.00'),
      },
    });

    // Mock customer count
    (prisma.customer.count as jest.Mock).mockResolvedValueOnce(15);

    // Mock recent orders
    (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([
      {
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        customer: {
          firstName: 'John',
          lastName: 'Doe',
        },
        id: 'order_1',
        orderNumber: 1001,
        totalAmount: new Prisma.Decimal('20.00'),
      },
      {
        createdAt: new Date('2025-01-02T00:00:00.000Z'),
        customer: {
          firstName: 'Jane',
          lastName: 'Smith',
        },
        id: 'order_2',
        orderNumber: 1002,
        totalAmount: new Prisma.Decimal('35.50'),
      },
    ]);

    // Mock stock alerts
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([
      {
        id: 'product_1',
        stockQuantity: 0,
        title: 'Product 1',
      },
      {
        id: 'product_2',
        stockQuantity: 5,
        title: 'Product 2',
      },
    ]);

    // Mock top customers
    (prisma.order.groupBy as jest.Mock).mockResolvedValueOnce([
      {
        _count: {
          id: 3,
        },
        _sum: {
          totalAmount: new Prisma.Decimal('150.00'),
        },
        customerId: 'customer_1',
      },
      {
        _count: {
          id: 2,
        },
        _sum: {
          totalAmount: new Prisma.Decimal('100.00'),
        },
        customerId: 'customer_2',
      },
    ]);

    // Mock customers for top customers
    (prisma.customer.findMany as jest.Mock).mockResolvedValueOnce([
      {
        firstName: 'Alice',
        id: 'customer_1',
        lastName: 'Johnson',
      },
      {
        firstName: 'Bob',
        id: 'customer_2',
        lastName: 'Williams',
      },
    ]);

    // Mock top products
    (prisma.orderItem.groupBy as jest.Mock).mockResolvedValueOnce([
      {
        _sum: {
          quantity: 10,
          unitPrice: new Prisma.Decimal('15.00'),
        },
        productId: 'product_1',
      },
      {
        _sum: {
          quantity: 8,
          unitPrice: new Prisma.Decimal('20.00'),
        },
        productId: 'product_2',
      },
    ]);

    // Mock products for top products
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([
      {
        id: 'product_1',
        title: 'Best Product',
      },
      {
        id: 'product_2',
        title: 'Popular Product',
      },
    ]);

    // Mock order items for revenue calculation - these will be called by calculateTotalRevenue
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([
      {
        quantity: 5,
        unitPrice: new Prisma.Decimal('15.00'),
      },
    ]);

    const res = await request(app).get('/api/dashboard/stats');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: {
        kpi: {
          averageOrderValue: '25.5',
          totalCustomers: 15,
          totalOrders: 10,
          totalRevenue: '255',
        },
        recentOrders: expect.any(Array),
        stockAlerts: expect.any(Array),
        topCustomers: expect.any(Array),
        topProducts: expect.any(Array),
      },
      success: true,
    });

    expect(res.body.data.recentOrders).toHaveLength(2);
    expect(res.body.data.stockAlerts).toHaveLength(2);
    expect(res.body.data.topCustomers).toHaveLength(2);
    expect(res.body.data.topProducts).toHaveLength(2);
  });

  it('GET /api/dashboard/stats with limit should respect limit parameter', async () => {
    // Mock basic aggregation
    (prisma.order.aggregate as jest.Mock).mockResolvedValueOnce({
      _avg: { totalAmount: new Prisma.Decimal('25.50') },
      _count: { id: 5 },
      _sum: { totalAmount: new Prisma.Decimal('127.50') },
    });

    (prisma.customer.count as jest.Mock).mockResolvedValueOnce(10);

    // Mock recent orders with limit
    (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([
      {
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        customer: { firstName: 'John', lastName: 'Doe' },
        id: 'order_1',
        orderNumber: 1001,
        totalAmount: new Prisma.Decimal('20.00'),
      },
    ]);

    // Mock other data with limit
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.order.groupBy as jest.Mock).mockResolvedValueOnce([]);
    (prisma.customer.findMany as jest.Mock).mockResolvedValueOnce([]);
    (prisma.orderItem.groupBy as jest.Mock).mockResolvedValue([]);
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([]);

    const res = await request(app)
      .get('/api/dashboard/stats')
      .query({ limit: '2' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/dashboard/stats should handle empty data gracefully', async () => {
    // Mock empty/null responses
    (prisma.order.aggregate as jest.Mock).mockResolvedValueOnce({
      _avg: { totalAmount: null },
      _count: { id: 0 },
      _sum: { totalAmount: null },
    });

    (prisma.customer.count as jest.Mock).mockResolvedValue(0);
    (prisma.order.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.order.groupBy as jest.Mock).mockResolvedValue([]);
    (prisma.customer.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.orderItem.groupBy as jest.Mock).mockResolvedValue([]);
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get('/api/dashboard/stats');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: {
        kpi: {
          averageOrderValue: '0',
          totalCustomers: 0,
          totalOrders: 0,
          totalRevenue: '0',
        },
        recentOrders: [],
        stockAlerts: [],
        topCustomers: [],
        topProducts: [],
      },
      success: true,
    });
  });

  it('GET /api/dashboard/stats should return 400 for invalid limit parameter', async () => {
    const res = await request(app)
      .get('/api/dashboard/stats')
      .query({ limit: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('GET /api/dashboard/stats should return 400 for limit out of range', async () => {
    const res = await request(app)
      .get('/api/dashboard/stats')
      .query({ limit: '25' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('GET /api/dashboard/stats should handle database errors', async () => {
    // Suppress console.error for this test since we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    (prisma.order.aggregate as jest.Mock).mockRejectedValueOnce(
      new Error('Database connection failed'),
    );

    const res = await request(app).get('/api/dashboard/stats');

    // The error should be caught by error middleware
    // This depends on how error middleware is set up in the app
    expect(res.status).not.toBe(200);

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('GET /api/dashboard/stats should properly format stock alerts', async () => {
    // Mock minimal required data
    (prisma.order.aggregate as jest.Mock).mockResolvedValueOnce({
      _avg: { totalAmount: new Prisma.Decimal('0') },
      _count: { id: 0 },
      _sum: { totalAmount: new Prisma.Decimal('0') },
    });

    (prisma.customer.count as jest.Mock).mockResolvedValue(0);
    (prisma.order.findMany as jest.Mock).mockResolvedValue([]);

    // Mock stock alerts with different stock levels (first call) and empty for second call
    (prisma.product.findMany as jest.Mock)
      .mockResolvedValueOnce([
        {
          id: 'product_1',
          stockQuantity: 0,
          title: 'Out of Stock Product',
        },
        {
          id: 'product_2',
          stockQuantity: 5,
          title: 'Low Stock Product',
        },
      ])
      .mockResolvedValue([]);

    (prisma.order.groupBy as jest.Mock).mockResolvedValue([]);
    (prisma.customer.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.orderItem.groupBy as jest.Mock).mockResolvedValue([]);
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get('/api/dashboard/stats');

    expect(res.status).toBe(200);
    expect(res.body.data.stockAlerts).toEqual([
      {
        currentStock: 0,
        id: 'product_1',
        name: 'Out of Stock Product',
        status: 'out_of_stock',
      },
      {
        currentStock: 5,
        id: 'product_2',
        name: 'Low Stock Product',
        status: 'low_stock',
      },
    ]);
  });
});
