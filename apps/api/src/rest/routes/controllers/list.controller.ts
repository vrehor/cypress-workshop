import { Router } from 'express';

import { RouterDefinition } from '../../interface';

const router = Router();

export const lists: RouterDefinition = {
  createRouter: ({ services: { BoardListDao, BoardDao } }) => {
    router.post('/', async (req, res) => {
      const body = req.body as unknown as {
        name: string;
        order?: number;
        boardId: number;
      };
      if (!body.name) {
        return res.status(422).send({
          error_message: 'Name cannot be null',
        });
      }

      const board = await BoardDao.find({
        id: body.boardId,
      });

      if (!board) {
        return res.status(404).send({
          error_message: 'Board not found',
        });
      }

      const list = await BoardListDao.create({
        name: body.name,
        order: body.order || 0,
        board: {
          connect: {
            id: body.boardId,
          },
        },
      });

      return res.status(201).send(list);
    });
    return router;
  },
  middlewares: [],
};
