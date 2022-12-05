import {
  CreateBoardListMutationResult,
  CreateBoardListMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a BoardList.
       * @example cy.createBoardList({ variables: { input: { name: "Test board name" } } })
       */
      createBoardList: typeof createBoardList;
    }
  }
}

export const createBoardList = (
  variables: CreateBoardListMutationVariables,
  handler?: (data: CreateBoardListMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'CreateBoardList',
    `
mutation CreateBoardList($boardId: Int!, $input: BoardListInput!) {
  createBoardList(boardId: $boardId, input: $input) {
    __typename
    ... on ValidationError {
      __typename
      code
      fields
      messages
    }
    ... on NotFoundError {
      __typename
      code
      message
    }
    ... on BoardList {
      __typename
      cards {
        deadline
        description
        id
        name
        order
      }
      id
      name
      order
    }
  }
}
    `,
    variables,
    handler
  );
};
