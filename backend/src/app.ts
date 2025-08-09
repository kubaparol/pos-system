import express from 'express';

import { prisma } from './config/db';
import { PORT } from './config/env';

const app = express();

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.listen(3000, () => {
  console.log(`MyStoreAssistant API is running on port ${PORT ?? '5432'}`);
});
