import { MiddlewareDefinition } from '../interface';

export const middleware: MiddlewareDefinition = (_, __, ___, next) => {
  next();
};
