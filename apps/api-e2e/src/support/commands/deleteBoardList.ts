import {
  DeleteBoardListMutationResult,
  DeleteBoardListMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to delete a BoardList.
       * @example cy.deleteBoard({ variables: { listId: "testListId" } })
       */
      deleteBoardList: typeof deleteBoardList;
    }
  }
}

export const deleteBoardList = (
  variables: DeleteBoardListMutationVariables,
  handler?: (data: DeleteBoardListMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'DeleteBoardList',
    `
mutation DeleteBoardList($listId: Int!) {
  deleteBoardList(listId: $listId) {
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
