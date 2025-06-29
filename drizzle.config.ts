import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  dialect: 'postgresql', // ← Must be 'postgresql' (not 'postgres')
  schema: './src/lib/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // For Neon, use 'url' not 'connectionString'
  },
  out: './drizzle/migrations', // Recommended: specify migrations output directory
} satisfies Config;