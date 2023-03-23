import { rule } from 'graphql-shield';
import { IRuleResult } from 'graphql-shield/typings/types';

import { Ctx } from '../context';

const contextual =
  (fn: (ctx: Ctx) => IRuleResult) => (_: unknown, __: unknown, context: Ctx) =>
    fn(context);

export const isAuthenticated = rule({ cache: 'contextual' })(
  contextual(ctx => {
    return !!ctx.services.CurrentUser?.tokenData?.user_id;
  })
);

export const isAnonymous = rule({ cache: 'contextual' })(
  contextual(ctx => {
    return !ctx.services.CurrentUser?.tokenData?.user_id;
  })
);
