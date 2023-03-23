import { ApolloError } from 'apollo-server-express';
import { rule, shield } from 'graphql-shield';

import { Ctx } from '../context';

import { mutations } from './mutations';
import { queries } from './queries';
import { types } from './types';

const permissions = shield<unknown, Ctx>(
  {
    Query: {
      ...queries,
    },
    Mutation: {
      ...mutations,
    },
    ...types,
  },
  {
    allowExternalErrors: true,
    debug: true,
    fallbackError: async (thrownError, _, __, ___, info) => {
      const logAndReturn = () => {
        console.error(
          `Error thrown while resolving ${info.parentType.name}.${info.fieldName}`,
          thrownError
        );
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER');
      };

      if (thrownError instanceof ApolloError) {
        // expected errors
        return thrownError;
      } else if (thrownError instanceof Error) {
        // unexpected errors
        return logAndReturn();
      } else {
        return logAndReturn();
      }
    },
    fallbackRule: rule({ cache: 'no_cache' })((_, __, ___, info) => {
      if (
        info.parentType.name === 'Query' ||
        info.parentType.name === 'Mutation'
      ) {
        return new Error(
          `Missing shield rule for query or mutation: ${info.fieldName}`
        );
      }
      return true;
    }),
  }
);

export default permissions;
