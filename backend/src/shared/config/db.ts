import { PrismaClient } from '../../../generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient: PrismaClient = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
