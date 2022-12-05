import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  await prisma.user.create({
    data: {
      email: 'test.email@unknown.com',
      password: '$2a$10$Zz107Vvqzajxhj04Z4yxs.u8vKMhHEj7wXlP6ftMsGYuaq.XgpBjK',
      id: 1,
    },
  });

  await prisma.user.create({
    data: {
      email: 'email@unknown.com',
      password: '$2a$10$Zz107Vvqzajxhj04Z4yxs.u8vKMhHEj7wXlP6ftMsGYuaq.XgpBjK',
      id: 2,
    },
  });

  await prisma.board.create({
    data: {
      id: 1,
      name: 'My very private board',
      starred: false,
      createdAt: new Date('2022-07-21'),
      userId: 1,
    },
  });

  await prisma.board.create({
    data: {
      id: 2,
      name: 'private board of the example user',
      starred: false,
      createdAt: new Date('2022-07-21'),
      userId: 2,
    },
  });

  await prisma.list.create({
    data: {
      id: 1,
      name: 'Favorite music',
      createdAt: new Date('2022-07-21'),
      order: 0,
      boardId: 1,
    },
  });

  await prisma.list.create({
    data: {
      id: 2,
      name: 'Nothing to see here',
      createdAt: new Date('2022-07-21'),
      order: 0,
      boardId: 2,
    },
  });

  await prisma.card.create({
    data: {
      id: 1,
      name: 'Celine Dion',
      order: 0,
      listId: 1,
      createdAt: new Date('2022-07-21'),
      deadline: new Date('2022-07-24'),
    },
  });

  await prisma.card.create({
    data: {
      id: 2,
      name: 'Christina Aguilera',
      order: 0,
      listId: 1,
      createdAt: new Date('2022-07-21'),
      deadline: new Date('2022-07-24'),
    },
  });

  await prisma.card.create({
    data: {
      id: 3,
      name: 'Britney Spears',
      order: 1,
      listId: 1,
      createdAt: new Date('2022-07-21'),
      deadline: new Date('2022-07-24'),
    },
  });
};

export const teardown = async () => {};
