import { ApolloError, ApolloServer } from 'apollo-server-express';
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import addRequestId from 'express-request-id';
import { applyMiddleware } from 'graphql-middleware';
import { createServer } from 'http';

import 'reflect-metadata';

import { context, plugins, schema, shield } from './config/apollo';
import { delayConfig } from './config/delay';
import logger from './config/logger';
import ServiceContainer from './helpers/ServiceContainer';
import * as restApi from './rest';

logger.info('Running main server process.');

const app = express();

app.use(addRequestId());

app.use(
  jwt({
    secret: process.env.NX_TOKEN_KEY || '',
    algorithms: ['HS256'],
    credentialsRequired: false,
  })
);

app.use((req, __, next) => {
  if (req.path === '/api/delay') {
    next();
    return;
  }

  // delay
  setTimeout(() => {
    next();
    console.info(`Delaying response by ${delayConfig.getDelay()}`);
  }, delayConfig.getDelay());
});

const port = process.env.PORT || 3333;

const startServer = async () => {
  const httpServer = createServer(app);

  const apolloSchema = applyMiddleware(schema, shield);

  const apolloServer = new ApolloServer({
    schema: apolloSchema,
    context,
    plugins,
    logger,
    // https://www.apollographql.com/docs/apollo-server/performance/cache-backends/#ensuring-a-bounded-cache
    cache: 'bounded',
    formatError(error) {
      logger.error(`Masking error for response.`, error);

      return new ApolloError(`Internal Server Error`);
    },
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: true, path: '/graphql' });

  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
  restApi.register(app, port);

  logger.info(
    `GraphQL server listening at http://localhost:${port}${apolloServer.graphqlPath}`
  );

  // Clean up the services to avoid memory leak
  app.use((req, __, next) => {
    next();
    const requestId = (req as unknown as { id: string }).id;
    ServiceContainer.dispose(requestId);
  });
};

startServer();

// temporary hack for cypress. Cypress is not ending process correctly, but sends disconnect event
process.on('disconnect', async () => {
  process.exit(0);
});
