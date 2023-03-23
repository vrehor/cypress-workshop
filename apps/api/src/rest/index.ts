import type { Application } from 'express';

import { registerRouter } from './helpers';
import { controllers, middleware } from './routes';

export const register = (app: Application, port: string | number = 3333) => {
  registerRouter('api', controllers, middleware, app, +port);
};
