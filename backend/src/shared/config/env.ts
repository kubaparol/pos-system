import { config } from 'dotenv';
import z from 'zod';

config({ path: '.env' });

const envSchema = z.object({
  JWT_SECRET: z.string().min(1),
  PORT: z.coerce
    .number()
    .positive()
    .max(65536, `options.port should be >= 0 and < 65536`)
    .default(3001),
});

export const env = envSchema.parse(process.env);
