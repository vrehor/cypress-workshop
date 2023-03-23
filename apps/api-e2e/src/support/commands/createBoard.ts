import {
  CreateBoardMutationResult,
  CreateBoardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a Board.
       * @example cy.createBoard({ variables: { input: { name: "Test board name" } } })
       */
      createBoard: typeof createBoard;
    }
  }
}

export const createBoard = (
  variables: CreateBoardMutationVariables,
  handler?: (data: CreateBoardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'CreateBoard',
    `
      mutation CreateBoard($input: BoardInput!) {
        createBoard(input: $input) {
          ... on ValidationError {
            __typename
            code
            fields
            messages
          }
          ... on Board {
            __typename
            id
            name
            starred
          }
        }
      }
    `,
    variables,
    handler
  );
};
