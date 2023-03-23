import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.board.create({
    data: {
      id: 1,
      name: 'Things to buy',
      starred: false,
      createdAt: new Date('2022-01-23T00:00:00'),
    },
  });
};

export const teardown = async () => {};
