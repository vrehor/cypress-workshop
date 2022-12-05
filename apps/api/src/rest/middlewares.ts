import { NextFunction, Request, Response } from 'express-serve-static-core';

import logger from '../config/logger';

export const requestResponseLogger =
  () => (req: Request, res: Response, next: NextFunction) => {
    const { path, query, body } = req;
    const id = (req as unknown as { id: string }).id;

    logger.info(`Received Request: ${path}`, {
      path: `${path}`,
      request: { body, query },
      requestId: id,
    });

    const send = res.send;
    res.send = c => {
      logger.info(`Sending Response: /${path}`, {
        path: `/${path}`,
        status: res.statusCode,
        response: JSON.stringify(c),
        requestId: id,
      });
      res.send = send;
      return res.send(c);
    };

    return next();
  };
