import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
	pgPool: pg.Pool | undefined;
};

const pgPool =
	globalForPrisma.pgPool ??
	new pg.Pool({
		connectionString: process.env.DATABASE_URL,
	});

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter: new PrismaPg(pgPool),
		log: ['error'],
	});

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
	globalForPrisma.pgPool = pgPool;
}
