import type { Application } from 'express';
import express from 'express';
import { Request } from 'express-serve-static-core';
import morgan from 'morgan';

import logger from '../config/logger';
import { Logger } from '../services';
import scopedServiceRegistry from '../services/serviceRegistry';

import { MiddlewareDefinition, RouterDefinition } from './interface';
import { requestResponseLogger } from './middlewares';

const getServices = (req: Request) => {
  const requestId = (req as unknown as { id: string }).id;
  return scopedServiceRegistry(requestId);
};

export const registerRouter = (
  routerName: string,
  router: Record<string, RouterDefinition>,
  middleware: MiddlewareDefinition,
  app: Application,
  port: number
) => {
  const loadedRoute: string[] = [];

  app.use(`/${routerName}`, (req, ...rest) =>
    middleware({ services: getServices(req) }, req, ...rest)
  );

  app.use(requestResponseLogger());
  app.use(express.json());

  for (const subRouteName of Object.keys(router)) {
    const subRouteKey = subRouteName as keyof typeof router;
    const routeName = `${routerName}/${subRouteName}`;
    const createRouter = router[subRouteKey]?.createRouter;

    app.use(
      `/${routeName}`,
      morgan('combined'),
      ...(router[subRouteKey]?.middlewares ?? []),
      async (req, res, ...rest) => {
        const requestId = (req as unknown as { id: string }).id;
        const services = getServices(req);
        services.instance().set(Logger, Logger.initialize(requestId));
        return createRouter?.({
          services,
        })(req, res, ...rest);
      }
    );

    loadedRoute.push(routeName);
  }

  logger.info(
    `${routerName} bootstrapped at route: http://localhost:${port}/${routerName}.`,
    {
      including: loadedRoute,
    }
  );
};
