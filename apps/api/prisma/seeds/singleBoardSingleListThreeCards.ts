import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.board.create({
    data: {
      id: 1,
      name: 'Shopping list',
      starred: false,
      createdAt: new Date('2022-01-23T00:00:00'),
    },
  });

  await prisma.list.create({
    data: {
      id: 1,
      name: 'Groceries',
      order: 0,
      boardId: 1,
      createdAt: new Date('2022-01-26T00:00:00'),
    },
  });

  await prisma.card.create({
    data: {
      id: 1,
      name: 'Milk',
      order: 0,
      listId: 1,
      createdAt: new Date('2022-01-26T00:00:00'),
      deadline: new Date('2022-03-01T00:00:00'),
    },
  });

  await prisma.card.create({
    data: {
      id: 2,
      name: 'Bread',
      order: 1,
      listId: 1,
      createdAt: new Date('2022-01-26T00:00:00'),
      deadline: new Date('2022-02-14T00:00:00'),
    },
  });

  await prisma.card.create({
    data: {
      id: 4,
      name: 'Shampoo',
      order: 3,
      listId: 1,
      createdAt: new Date('2022-02-11T00:00:00'),
      deadline: new Date('2022-02-14T00:00:00'),
    },
  });

  await prisma.card.create({
    data: {
      id: 5,
      name: 'Soap',
      order: 4,
      listId: 1,
      createdAt: new Date('2022-02-11T00:00:00'),
      deadline: new Date('2022-03-01T00:00:00'),
    },
  });
};

export const teardown = async () => {};
