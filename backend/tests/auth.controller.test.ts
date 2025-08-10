import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import authRouter from '../src/auth/auth.route';
import { prisma } from '../src/shared/config/db';

// Mocks
jest.mock('../src/shared/config/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../src/shared/config/env', () => ({
  env: { JWT_SECRET: 'test-secret', PORT: 3001 },
}));

describe('Auth Controller', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/auth/sign-in should return 400 when payload is invalid', async () => {
    const res = await request(app).post('/api/auth/sign-in').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('POST /api/auth/sign-in should return 401 when user not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const res = await request(app)
      .post('/api/auth/sign-in')
      .send({ email: 'john@example.com', password: 'secret' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'Invalid email or password',
      success: false,
    });
  });

  it('POST /api/auth/sign-in should return 401 when password is invalid', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      email: 'john@example.com',
      id: 'user_1',
      password: 'hashed',
      updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    });

    (bcrypt.compare as unknown as jest.Mock).mockResolvedValueOnce(false);

    const res = await request(app)
      .post('/api/auth/sign-in')
      .send({ email: 'john@example.com', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'Invalid email or password',
      success: false,
    });
  });

  it('POST /api/auth/sign-in should return 200 and token on success', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      email: 'john@example.com',
      id: 'user_1',
      password: 'hashed',
      updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    });

    (bcrypt.compare as unknown as jest.Mock).mockResolvedValueOnce(true);
    (jwt.sign as unknown as jest.Mock).mockReturnValueOnce('fake-jwt-token');

    const res = await request(app)
      .post('/api/auth/sign-in')
      .send({ email: 'john@example.com', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      data: { token: 'fake-jwt-token', userId: 'user_1' },
      message: 'User signed in successfully',
      success: true,
    });
  });
});
