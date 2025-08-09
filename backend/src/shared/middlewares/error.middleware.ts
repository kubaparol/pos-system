import { NextFunction, Request, Response } from 'express';

import { Prisma } from '../../../generated/prisma';
import { isStringArray } from '../utils/is-string-array';

interface ErrorResponseBody {
  error: string;
  success: false;
}

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response<ErrorResponseBody>,
  _next: NextFunction,
) => {
  void _next;

  let statusCode = 500;
  let message = 'Server Error';

  // Log the original error for observability
  console.error(err);

  // Prisma known request errors (e.g., unique constraint violation, FK violation, record not found)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const knownErr = err;
    switch (knownErr.code) {
      case 'P2002': {
        // Unique constraint failed on the fields
        const metaUnknown: unknown = knownErr.meta ?? {};
        let fields: string[] | undefined;
        if (typeof metaUnknown === 'object' && metaUnknown !== null) {
          const target = (metaUnknown as Record<string, unknown>).target;
          if (isStringArray(target)) {
            fields = target;
          }
        }
        const fieldList = fields?.join(', ');
        message = fieldList
          ? `Unique constraint failed on field(s): ${fieldList}`
          : 'Unique constraint failed';
        statusCode = 409;
        break;
      }
      case 'P2003': {
        // Foreign key constraint failed
        message = 'Foreign key constraint failed';
        statusCode = 409;
        break;
      }
      case 'P2025': {
        // Record not found
        message = 'Resource not found';
        statusCode = 404;
        break;
      }
      default: {
        message = 'Database request error';
        statusCode = 400;
        break;
      }
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Prisma validation error (invalid data shape)
    message = 'Invalid data provided';
    statusCode = 400;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    // Database connection/init problem
    message = 'Database initialization error';
    statusCode = 500;
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    message = 'Internal database error';
    statusCode = 500;
  } else if (err instanceof Error) {
    // Generic JS error
    message = err.message;
    statusCode = 500;
  }

  res.status(statusCode).json({
    error: message,
    success: false,
  });
};
