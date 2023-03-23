import { BoardQueryResult, BoardQueryVariables } from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get a Board.
       * @example cy.getBoard({ variables: { boardId: "testBoardId" } })
       */
      getBoard: typeof getBoard;
    }
  }
}

export const getBoard = (
  variables: BoardQueryVariables,
  handler?: (data: BoardQueryResult['data']) => void
) => {
  return cy.graphqlQuery(
    'Board',
    `
query Board($boardId: Int!) {
  __typename
  board(boardId: $boardId) {
    __typename
    ... on Board {
      __typename
      id
      name
      starred
      lists {
        cards {
          deadline
          description
          id
          name
          order
          done
        }
        id
        name
        order
      }
    }
    ... on NotFoundError {
      __typename
      code
      message
    }
  }
}
    `,
    variables,
    handler
  );
};
