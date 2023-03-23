import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.board.create({
    data: {
      id: 1,
      name: 'Things to buy',
      starred: false,
    },
  });

  await prisma.board.create({
    data: {
      id: 2,
      name: 'Work stuff',
      starred: false,
    },
  });

  await prisma.list.create({
    data: {
      id: 1,
      name: 'To Do',
      order: 0,
      boardId: 2,
    },
  });

  await prisma.card.create({
    data: {
      id: 1,
      name: 'Create a new course chapter',
      order: 0,
      deadline: new Date('2022-02-01'),
      listId: 1,
    },
  });
};

export const teardown = async () => {};
