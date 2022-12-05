import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.board.create({
    data: {
      id: 1,
      name: 'Cypress workshop',
      starred: false,
    },
  });

  await prisma.list.create({
    data: {
      id: 1,
      name: 'To do',
      order: 0,
      boardId: 1,
    },
  });

  await prisma.list.create({
    data: {
      id: 2,
      name: 'Done',
      order: 0,
      boardId: 1,
    },
  });

  await prisma.card.create({
    data: {
      id: 1,
      name: 'Explain plugins',
      order: 1,
      deadline: new Date('2022-03-27'),
      listId: 1,
    },
  });

  await prisma.card.create({
    data: {
      id: 2,
      name: 'Explain intercept',
      order: 1,
      deadline: new Date('2022-03-27'),
      listId: 1,
    },
  });
};

export const teardown = async () => {};
