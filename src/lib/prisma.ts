import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

prisma.$connect().catch((err: unknown) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});

export default prisma;
