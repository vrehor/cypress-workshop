import {
  DeleteBoardMutationResult,
  DeleteBoardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to delete a Board.
       * @example cy.createBoard({ variables: { boardId: "Test board id" } })
       */
      deleteBoard: typeof deleteBoard;
    }
  }
}

export const deleteBoard = (
  variables: DeleteBoardMutationVariables,
  handler?: (data: DeleteBoardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'DeleteBoard',
    `
mutation DeleteBoard($boardId: Int!) {
  deleteBoard(boardId: $boardId) {
    __typename
    ... on NotFoundError {
      __typename
      code
      message
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
