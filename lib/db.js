const { PrismaClient } = require('@prisma/client');

// export const db = new PrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }
  return globalThis.prismaClient;
}

export const db = createPrismaClient();
