import express from 'express';

import { PORT } from './config/env';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3000, () => {
  console.log(`MyStoreAssistant API is running on port ${PORT ?? '5432'}`);
});
