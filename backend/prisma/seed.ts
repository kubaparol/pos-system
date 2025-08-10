import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding started...');

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  }

  // Seed administrator account only if it does not exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: ADMIN_EMAIL,
    },
  });

  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const user = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
      },
    });

    console.log(`👤 Created user with id: ${user.id}`);
  } else {
    console.log('👤 Admin user already exists, skipping creation');
  }

  // Seed products from FakeStoreAPI only if no products exist yet
  const existingProductsCount = await prisma.product.count();

  if (existingProductsCount === 0) {
    console.log('🛒 Importing products from FakeStoreAPI...');

    interface FakeStoreProduct {
      category: string;
      description: string;
      id: number;
      image: string;
      price: number;
      rating: {
        count: number;
        rate: number;
      };
      title: string;
    }

    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const payload = (await response.json()) as FakeStoreProduct[];

    const data = payload.map((p) => ({
      category: p.category,
      description: p.description,
      imageUrl: p.image,
      isArchived: false,
      price: p.price,
      reviewCount: p.rating.count,
      reviewRating: p.rating.rate,
      stockQuantity: 10,
      title: p.title,
    }));

    if (data.length > 0) {
      await prisma.product.createMany({ data });

      console.log(`📦 Imported ${data.length} products`);
    }
  } else {
    console.log('📦 Products already exist, skipping import');
  }
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
