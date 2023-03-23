import {
  UpdateCardMutationResult,
  UpdateCardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to update a Card.
       * @example cy.updateCard({ variables: { input: { name: "Test board name" } } })
       */
      updateCard: typeof updateCard;
    }
  }
}

export const updateCard = (
  variables: UpdateCardMutationVariables,
  handler?: (data: UpdateCardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'UpdateCard',
    `
mutation UpdateCard($cardId: Int!, $input: CardUpdateInput!) {
  updateCard(cardId: $cardId, input: $input) {
    __typename
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
