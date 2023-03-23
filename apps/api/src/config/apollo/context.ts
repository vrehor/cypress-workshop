import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import { PromiseType } from 'utility-types';

import { CurrentUser } from '../../services';
import scopedServiceRegistry from '../../services/serviceRegistry';

export const context = async ({
  req,
}: Parameters<ContextFunction<ExpressContext>>[0]) => {
  const requestId = (req as unknown as { id: string }).id;
  const token = req as unknown as { auth: { user_id: number } };
  const services = scopedServiceRegistry(requestId);

  if (req) {
    services
      .instance()
      .set(CurrentUser, services.CurrentUser.initializeFromToken(token?.auth));
  }

  // services
  //   .instance()
  //   .set(Logger, Logger.initialize(requestId, userToken?.id, userToken?.role));

  return { req, services };
};

export type Ctx = PromiseType<ReturnType<typeof context>>;
