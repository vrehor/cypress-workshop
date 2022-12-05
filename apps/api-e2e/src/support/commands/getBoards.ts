import { BoardsQueryResult, BoardsQueryVariables } from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getBoards: typeof getBoards;
    }
  }
}

export const getBoards = (
  variables: BoardsQueryVariables,
  handler?: (data: BoardsQueryResult['data']) => void
) => {
  return cy.graphqlQuery(
    'Boards',
    `
      query Boards {
        __typename
        boards {
          __typename
          id
          name
          starred
        }
      }
    `,
    variables,
    handler
  );
};
