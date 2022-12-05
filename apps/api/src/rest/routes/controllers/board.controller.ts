import { Router } from 'express';

import { RouterDefinition } from '../../interface';

const router = Router();

export const boards: RouterDefinition = {
  createRouter: ({ services: { BoardDao, CurrentUser } }) => {
    router.get('/', async (req, res) => {
      const filter = Boolean(req.query['starred']);
      const result = await BoardDao.find({
        starred: filter,
      });
      return res.status(200).send(result);
    });

    router.post('/', async (req, res) => {
      const body = req.body as unknown as { name: string };
      console.log(body);
      if (!body.name) {
        return res.status(422).send({
          error_message: 'Name cannot be null',
        });
      }

      const board = await BoardDao.create({
        name: body.name,
        user: CurrentUser?.tokenData?.user_id
          ? {
              connect: {
                id: CurrentUser?.tokenData?.user_id,
              },
            }
          : undefined,
      });

      return res.status(201).send(board);
    });
    return router;
  },
  middlewares: [],
};
