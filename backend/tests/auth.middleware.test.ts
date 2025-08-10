import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { authorize } from '../src/shared/middlewares/auth.middleware.js';

// Mocks
jest.mock('jsonwebtoken');
jest.mock('../src/shared/config/env', () => ({
  env: { JWT_SECRET: 'test-secret', PORT: 3001 },
}));

describe('authorize middleware', () => {
  const app = express();
  app.use(express.json());
  app.get('/protected', authorize, (req, res) => {
    const userId = (req as typeof req & { userId?: string }).userId;
    res.status(200).json({ data: { userId }, success: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 when Authorization header is missing', async () => {
    const res = await request(app).get('/protected');

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized', success: false });
  });

  it('should return 401 when token is invalid', async () => {
    (jwt.verify as unknown as jest.Mock).mockImplementationOnce(() => {
      throw new Error('invalid');
    });

    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid');

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized', success: false });
  });

  it('should call next and expose userId when token is valid', async () => {
    (jwt.verify as unknown as jest.Mock).mockReturnValueOnce({
      userId: 'user_1',
    });

    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer valid');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { userId: 'user_1' }, success: true });
  });
});
