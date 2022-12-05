import {
  CreateCardMutationResult,
  CreateCardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a BoardList.
       * @example cy.createCard({ variables: { input: { name: "Test board name" } } })
       */
      createCard: typeof createCard;
    }
  }
}

export const createCard = (
  variables: CreateCardMutationVariables,
  handler?: (data: CreateCardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'CreateCard',
    `
mutation CreateCard($listId: Int!, $input: CardInput!) {
  createCard(listId: $listId, input: $input) {
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
    ... on Card {
      __typename
      description
      deadline
      id
      name
      order
      done
    }
  }
}
    `,
    variables,
    handler
  );
};
