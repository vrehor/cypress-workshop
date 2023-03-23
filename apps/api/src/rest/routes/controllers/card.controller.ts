import { Router } from 'express';

import { RouterDefinition } from '../../interface';

const router = Router();

export const cards: RouterDefinition = {
  createRouter: ({ services: { BoardListDao, CardDao } }) => {
    router.post('/', async (req, res) => {
      const body = req.body as unknown as {
        name: string;
        order?: number;
        description?: string;
        deadline?: string;
        listId: number;
      };
      if (!body.name) {
        return res.status(422).send({
          error_message: 'Name cannot be null',
        });
      }

      const list = await BoardListDao.findById(body.listId, {
        id: true,
        cards: {
          select: {
            id: true,
          },
        },
      });

      if (!list) {
        return res.status(404).send({
          error_message: 'List not found',
        });
      }

      const now = new Date();

      const card = await CardDao.create({
        deadline: new Date(now.setDate(now.getDate() + 2)),
        order: (list.cards?.length || 0) + 1,
        name: body.name,
        ...(body?.order ? { order: body.order } : {}),
        ...(body?.description ? { description: body.description } : {}),
        ...(body?.deadline ? { deadline: body.deadline } : {}),
        list: {
          connect: {
            id: body.listId,
          },
        },
      });

      return res.status(201).send(card);
    });
    return router;
  },
  middlewares: [],
};
