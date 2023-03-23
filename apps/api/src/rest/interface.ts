import { RequestHandler, Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';

import { Ctx } from '../config/apollo/context';

export type RouterDefinition = {
  createRouter: (context: Pick<Ctx, 'services'>) => Router;
  middlewares?: RequestHandler[];
};

export type MiddlewareDefinition = (
  context: Pick<Ctx, 'services'>,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
