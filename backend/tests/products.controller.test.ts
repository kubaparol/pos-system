import express from 'express';
import request from 'supertest';

import productsRouter from '../src/products/products.route.js';
import { prisma } from '../src/shared/config/db.js';

// Mocks
jest.mock('../src/shared/config/db', () => ({
  prisma: {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('Products Controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/products', productsRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/products should return 200 with list of products', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([
      {
        category: 'books',
        description: 'A book',
        id: 'p1',
        isArchived: false,
        price: 10,
        stockQuantity: 5,
        title: 'Book 1',
      },
    ]);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ data: expect.any(Array), success: true });
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('GET /api/products/:id should return 200 with product', async () => {
    (prisma.product.findUniqueOrThrow as jest.Mock).mockResolvedValueOnce({
      category: 'books',
      description: 'A book',
      id: 'p1',
      isArchived: false,
      price: 10,
      stockQuantity: 5,
      title: 'Book 1',
    });

    const res = await request(app).get('/api/products/p1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { id: 'p1', title: 'Book 1' },
      success: true,
    });
  });

  it('POST /api/products should return 400 for invalid payload', async () => {
    const res = await request(app).post('/api/products').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('POST /api/products should return 201 and created product', async () => {
    (prisma.product.create as jest.Mock).mockResolvedValueOnce({
      category: 'books',
      description: 'A book',
      id: 'p1',
      isArchived: false,
      price: 10,
      stockQuantity: 0,
      title: 'Book 1',
    });

    const res = await request(app).post('/api/products').send({
      category: 'books',
      description: 'A book',
      price: 10,
      title: 'Book 1',
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      data: { id: 'p1', title: 'Book 1' },
      message: 'Product created',
      success: true,
    });
  });

  it('PATCH /api/products/:id should return 400 for invalid payload', async () => {
    const res = await request(app)
      .patch('/api/products/p1')
      .send({ imageUrl: 'invalid-url' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('PATCH /api/products/:id should return 200 and updated product', async () => {
    (prisma.product.update as jest.Mock).mockResolvedValueOnce({
      category: 'books',
      description: 'Updated',
      id: 'p1',
      isArchived: false,
      price: 12,
      stockQuantity: 3,
      title: 'Updated title',
    });

    const res = await request(app)
      .patch('/api/products/p1')
      .send({ description: 'Updated', title: 'Updated title' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { id: 'p1', title: 'Updated title' },
      message: 'Product updated',
      success: true,
    });
  });

  it('POST /api/products/:id/archive should return 200 and archived product', async () => {
    (prisma.product.update as jest.Mock).mockResolvedValueOnce({
      category: 'books',
      description: 'A book',
      id: 'p1',
      isArchived: true,
      price: 10,
      stockQuantity: 5,
      title: 'Book 1',
    });

    const res = await request(app).post('/api/products/p1/archive');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { id: 'p1', isArchived: true },
      message: 'Product archived',
      success: true,
    });
  });

  it('POST /api/products/:id/restore should return 200 and restored product', async () => {
    (prisma.product.update as jest.Mock).mockResolvedValueOnce({
      category: 'books',
      description: 'A book',
      id: 'p1',
      isArchived: false,
      price: 10,
      stockQuantity: 5,
      title: 'Book 1',
    });

    const res = await request(app).post('/api/products/p1/restore');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { id: 'p1', isArchived: false },
      message: 'Product restored',
      success: true,
    });
  });
});
