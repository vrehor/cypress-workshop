import {
  UpdateBoardMutationResult,
  UpdateBoardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to update a Board.
       * @example cy.updateBoard({ variables: { input: { name: "Test board name" } } })
       */
      updateBoard: typeof updateBoard;
    }
  }
}

export const updateBoard = (
  variables: UpdateBoardMutationVariables,
  handler?: (data: UpdateBoardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'UpdateBoard',
    `
mutation UpdateBoard($input: BoardUpdateInput!, $boardId: Int!) {
  updateBoard(input: $input, boardId: $boardId) {
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
