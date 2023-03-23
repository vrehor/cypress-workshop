import {
  UpdateBoardListMutationResult,
  UpdateBoardListMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to update a BoardList.
       * @example cy.updateBoardList({ variables: { input: { name: "Test board name" } } })
       */
      updateBoardList: typeof updateBoardList;
    }
  }
}

export const updateBoardList = (
  variables: UpdateBoardListMutationVariables,
  handler?: (data: UpdateBoardListMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'UpdateBoardList',
    `
mutation UpdateBoardList($listId: Int!, $input: BoardListUpdateInput!) {
  updateBoardList(listId: $listId, input: $input) {
    __typename
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
