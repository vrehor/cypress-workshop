import { Config, gql } from 'apollo-server';
import { GraphQLRequestListener } from 'apollo-server-plugin-base';
import { getOperationDefinition } from 'apollo-utilities';
import { FieldNode } from 'graphql';

import logger from '../logger';

import { Ctx } from './context';

const IGNORED_QUERIES = ['__schema'];

const getQueryName = (query?: string | null) => {
  if (!query) return null;
  const operation = getOperationDefinition(gql(query));

  return (operation?.selectionSet.selections[0] as FieldNode)?.name?.value;
};

export const plugins = [
  {
    requestDidStart() {
      return {
        // @ts-ignore
        didEncounterErrors({ context, errors }) {
          // handle error if needed
        },
      } as GraphQLRequestListener<Ctx>;
    },
  },
  {
    // @ts-ignore
    requestDidStart({ request, context }) {
      return {
        // @ts-ignore
        async willSendResponse({ context }) {
          // hook for transaction finished
        },
        async executionDidStart() {
          return {
            // @ts-ignore
            willResolveField({ context, info }) {
              // hook for each new resolver
              return () => {};
            },
          };
        },
      } as GraphQLRequestListener<Ctx>;
    },
  },
  {
    async serverWillStart() {
      logger.info('Server is being started', {
        nodeVersion: process.version,
      });
    },
    async requestDidStart(requestContext) {
      const query = requestContext.request.query;
      const { Logger } = requestContext.context.services;

      const queryName = getQueryName(query);
      const isIgnored = queryName && IGNORED_QUERIES.includes(queryName);
      if (!isIgnored) {
        Logger.info(`Received Request: /${queryName}`, {
          path: `/${queryName}`,
          request: {
            variables: requestContext.request.variables,
          },
        });
      }

      return {
        async willSendResponse({ response }) {
          if (!isIgnored) {
            Logger.info(`Sending Response: /${queryName}`, {
              path: `/${queryName}`,
              response: JSON.stringify(response.data),
            });
          }
        },
      };
    },
  },
] as Config['plugins'];
