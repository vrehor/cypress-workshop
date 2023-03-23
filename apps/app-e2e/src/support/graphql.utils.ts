// utils/graphql-test-utils.js

// Utility to match GraphQL mutation based on the operation name
import { CyHttpMessages } from 'cypress/types/net-stubbing';

export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  const { body } = req;
  console.log({
    operationName: body?.operationName,
    tt: operationName,
    res: 'operationName' in body && body.operationName === operationName,
  });
  return 'operationName' in body && body.operationName === operationName;
};

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
