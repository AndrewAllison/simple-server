import { PrismaClient } from '@prisma/client'
import config from '../config/config'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      config.get('env') === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (config.get('env') !== 'production') globalForPrisma.prisma = prisma
