import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.board.create({
    data: {
      id: 1,
      name: 'Things to buy',
      starred: false,
      createdAt: new Date('2022-01-23'),
    },
  });

  await prisma.list.create({
    data: {
      id: 1,
      name: 'Groceries',
      order: 0,
      boardId: 1,
      createdAt: new Date('2022-02-11'),
    },
  });
};

export const teardown = async () => {};
