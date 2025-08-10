import { Prisma } from '@prisma/client';
import express from 'express';
import request from 'supertest';

import ordersRouter from '../src/orders/orders.route.js';
import { prisma } from '../src/shared/config/db.js';

// Mocks
jest.mock('../src/shared/config/db', () => ({
  prisma: {
    $transaction: jest.fn(),
    order: {
      findMany: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
    },
  },
}));

describe('Orders Controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/orders', ordersRouter);

  const P1 = 'ba59ca13-272e-4391-adea-6f1bde23793c';
  const P2 = '70318ee5-07dc-45ab-b681-fc9025b3079f';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/orders should return 200 with list of orders', async () => {
    (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([
      {
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        customer: {
          firstName: 'Jane',
          id: 'cust_1',
          lastName: 'Doe',
          phone: '123456789',
        },
        id: 'order_1',
        items: [
          {
            id: 'item_1',
            product: {
              id: P1,
              title: 'Product 1',
            },
            quantity: 2,
            unitPrice: new Prisma.Decimal('10.00'),
          },
        ],
        totalAmount: new Prisma.Decimal('20.00'),
        updatedAt: new Date('2025-01-01T00:00:00.000Z'),
      },
    ]);

    const res = await request(app).get('/api/orders');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ data: expect.any(Array), success: true });
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('GET /api/orders with q should filter and return 200', async () => {
    (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

    const res = await request(app).get('/api/orders').query({ q: '123456' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ data: [], success: true });
  });

  it('POST /api/orders/finalize should return 400 for invalid payload', async () => {
    const res = await request(app).post('/api/orders/finalize').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('POST /api/orders/finalize should return 409 when cart contains invalid items', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([
      {
        id: P1,
        isArchived: true,
        price: new Prisma.Decimal('10.00'),
        stockQuantity: 10,
        title: 'Product 1',
      },
    ]);

    const res = await request(app)
      .post('/api/orders/finalize')
      .send({
        customer: { firstName: 'John', lastName: 'Doe', phone: '123456789' },
        items: [
          { productId: P1, quantity: 1 },
          { productId: P2, quantity: 2 },
        ],
      });

    expect(res.status).toBe(409);
    expect(res.body).toMatchObject({
      error: 'Cart contains invalid items',
      success: false,
    });
    expect(res.body.details.invalidItems).toEqual([
      { productId: P1, reason: 'ARCHIVED' },
      { productId: P2, reason: 'NOT_FOUND' },
    ]);
  });

  it('POST /api/orders/finalize should return 201 and order on success', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([
      {
        id: P1,
        isArchived: false,
        price: new Prisma.Decimal('10.00'),
        stockQuantity: 5,
        title: 'Product 1',
      },
      {
        id: P2,
        isArchived: false,
        price: new Prisma.Decimal('20.00'),
        stockQuantity: 5,
        title: 'Product 2',
      },
    ]);

    interface Tx {
      customer: { upsert: jest.Mock };
      order: { create: jest.Mock };
      product: { findMany: jest.Mock; updateMany: jest.Mock };
    }
    (prisma.$transaction as jest.Mock).mockImplementationOnce(
      (cb: (tx: Tx) => unknown) => {
        const tx: Tx = {
          customer: {
            upsert: jest.fn().mockResolvedValue({ id: 'cust_1' }),
          },
          order: {
            create: jest.fn().mockResolvedValue({
              createdAt: new Date('2025-01-01T00:00:00.000Z'),
              customer: {
                firstName: 'John',
                id: 'cust_1',
                lastName: 'Doe',
                phone: '123456789',
              },
              id: 'order_1',
              items: [
                {
                  id: 'item_1',
                  product: { id: P1, title: 'Product 1' },
                  quantity: 1,
                  unitPrice: new Prisma.Decimal('10.00'),
                },
                {
                  id: 'item_2',
                  product: { id: P2, title: 'Product 2' },
                  quantity: 2,
                  unitPrice: new Prisma.Decimal('20.00'),
                },
              ],
              note: null,
              totalAmount: new Prisma.Decimal('50.00'),
              updatedAt: new Date('2025-01-01T00:00:00.000Z'),
            }),
          },
          product: {
            findMany: jest.fn().mockResolvedValue([
              {
                id: P1,
                isArchived: false,
                price: new Prisma.Decimal('10.00'),
                stockQuantity: 5,
                title: 'Product 1',
              },
              {
                id: P2,
                isArchived: false,
                price: new Prisma.Decimal('20.00'),
                stockQuantity: 5,
                title: 'Product 2',
              },
            ]),
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
        };

        return cb(tx);
      },
    );

    const res = await request(app)
      .post('/api/orders/finalize')
      .send({
        customer: { firstName: 'John', lastName: 'Doe', phone: '123456789' },
        items: [
          { productId: P1, quantity: 1 },
          { productId: P2, quantity: 2 },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Order finalized',
      success: true,
    });
    expect(res.body.data).toHaveProperty('id', 'order_1');
    expect(res.body.data.items).toHaveLength(2);
  });
});
