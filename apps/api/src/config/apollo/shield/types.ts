import { allow, and, or } from 'graphql-shield';

import { belongsToUserEntity, noUserEntity } from './abac';
import { isAnonymous, isAuthenticated } from './rbac';

export const types = {
  User: allow,
  UserId: allow,
  Board: {
    '*': or(
      and(isAuthenticated, belongsToUserEntity),
      and(isAnonymous, noUserEntity)
    ),
  },
  // List: {
  //   '*': or(
  //     and(isAuthenticated, belongsToUserEntity),
  //     and(isAnonymous, noUserEntity)
  //   )
  // },
  // Card: {
  //   '*': or(
  //     and(isAuthenticated, belongsToUserEntity),
  //     and(isAnonymous, noUserEntity)
  //   )
  // }
};
