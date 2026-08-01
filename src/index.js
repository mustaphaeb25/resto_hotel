import app from './app.js';
import { env } from './config/env.js';
import prisma from './config/database.js';

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL');

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
