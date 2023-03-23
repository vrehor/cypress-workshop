import {
  ResetMutationResult,
  ResetMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Reset backend state.
       * @example cy.resetMutation({})
       */
      resetMutation: typeof resetMutation;
    }
  }
}

export const resetMutation = (
  variables: ResetMutationVariables,
  handler?: (data: ResetMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'Reset',
    `
      mutation Reset {
        __typename
        reset
      }
    `,
    variables,
    handler
  );
};
