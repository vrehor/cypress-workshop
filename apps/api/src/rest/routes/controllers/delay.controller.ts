import { Router } from 'express';

import { delayConfig } from '../../../config/delay';
import { RouterDefinition } from '../../interface';

const router = Router();

export const delay: RouterDefinition = {
  createRouter: () => {
    router.post('/', async (req, res) => {
      const delay = Number(req.query.delay);
      delayConfig.setDelay(delay);

      res.status(201).send();
    });
    return router;
  },
  middlewares: [],
};
