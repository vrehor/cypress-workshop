import {
  SignupMutationResult,
  SignupMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to signup a user.
       * @example cy.getBoard({ variables: { input: { password: "", email: ""} } })
       */
      signup: typeof signup;
    }
  }
}

export const signup = (
  variables: SignupMutationVariables,
  handler?: (data: SignupMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'Signup',
    `
mutation Signup($input: LoginInput!) {
  signup(input: $input) {
    __typename
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
