import {
  DeleteCardMutationResult,
  DeleteCardMutationVariables,
} from '@common/data-access';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to delete a Card.
       * @example cy.deleteCard({ variables: { cardId: "testCardId" } })
       */
      deleteCard: typeof deleteCard;
    }
  }
}

export const deleteCard = (
  variables: DeleteCardMutationVariables,
  handler?: (data: DeleteCardMutationResult['data']) => void
) => {
  return cy.graphqlQuery(
    'DeleteCard',
    `
mutation DeleteCard($cardId: Int!) {
  deleteCard(cardId: $cardId) {
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
