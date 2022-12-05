import { Prisma as P, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service({ global: true })
export class Prisma extends PrismaClient {
  constructor() {
    const config: P.PrismaClientOptions = {};

    super(config);

    this.$connect();
  }

  async $connect() {
    try {
      return await super.$connect();
    } catch (error) {
      console.error(
        `Failed to establish a connection with database at ${process.env.NX_DATABASE_URL}. Terminating a process...`
      );
      console.error(error);
      process.exit(1);
    }
  }
}
