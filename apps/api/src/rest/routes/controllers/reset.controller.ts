import { Router } from 'express';

import { RouterDefinition } from '../../interface';

const router = Router();

export const reset: RouterDefinition = {
  createRouter: ({ services: { Prisma } }) => {
    router.post('/', async (_, res) => {
      await Prisma.$transaction(async trx => {
        await trx.card.deleteMany();
        await trx.list.deleteMany();
        await trx.board.deleteMany();
        await trx.user.deleteMany();
      });
      return res.status(201).send();
    });
    return router;
  },
  middlewares: [],
};
