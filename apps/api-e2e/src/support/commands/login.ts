import {
  LoginMutationResult,
  LoginMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login a user.
       * @example cy.getBoard({ variables: { input: { password: "", email: ""} } })
       */
      login: typeof login;
    }
  }
}

export const login = (
  variables: LoginMutationVariables,
  handler?: (data: LoginMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'Login',
    `
mutation Login($input: LoginInput!) {
  login(input: $input) {
    __typename
    ... on AuthorizationError {
      __typename
      code
      message
    }
    ... on ValidationError {
      __typename
      code
      fields
      messages
    }
    ... on LoginData {
      __typename
      token
    }
  }
}
    `,
    variables,
    handler
  );
};
