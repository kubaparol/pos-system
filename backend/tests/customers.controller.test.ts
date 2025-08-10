import express from 'express';
import request from 'supertest';

import customersRouter from '../src/customers/customers.route';
import { prisma } from '../src/shared/config/db';

// Mocks
jest.mock('../src/shared/config/db', () => {
  return {
    prisma: {
      customer: {
        findUniqueOrThrow: jest.fn(),
      },
    },
  };
});

describe('Customers Controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/customers', customersRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/customers/search should return 400 when phone is missing', async () => {
    const res = await request(app).get('/api/customers/search');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('GET /api/customers/search should return 200 and customer when phone is provided', async () => {
    (prisma.customer.findUniqueOrThrow as jest.Mock).mockResolvedValueOnce({
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      firstName: 'Jane',
      id: 'cust_1',
      lastName: 'Doe',
      phone: '123456789',
      updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    });

    const res = await request(app)
      .get('/api/customers/search')
      .query({ phone: '123456789' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: {
        firstName: 'Jane',
        id: 'cust_1',
        lastName: 'Doe',
        phone: '123456789',
      },
      success: true,
    });
  });
});
