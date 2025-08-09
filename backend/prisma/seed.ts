import bcrypt from 'bcryptjs';

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding started...');

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: ADMIN_EMAIL,
    },
  });

  if (existingUser) {
    throw new Error('👤 Admin user already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  const user = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
    },
  });

  console.log(`👤 Created user with id: ${user.id}`);
  console.log('✅ Seeding completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(`❌ Error during seeding: ${error}`);
    await prisma.$disconnect();
    process.exit(1);
  });
