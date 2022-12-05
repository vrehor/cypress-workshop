export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      addBoard: typeof addBoard;
      addList: typeof addList;
      addCard: typeof addCard;
    }
  }
}

const addBoard = (boardName: string) => {
  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type(`${boardName}{enter}`);
};
Cypress.Commands.add('addBoard', addBoard);

const addList = (listName: string) => {
  cy.get('[data-cy="create-list"]').click();

  cy.get('[data-cy=add-list-input]').type(`${listName}{enter}`);
};
Cypress.Commands.add('addList', addList);

const addCard = (cardName: string) => {
  cy.get('[data-cy=new-card]').click();

  cy.get('[data-cy=new-card-input]').type(`${cardName}{enter}`);
};
Cypress.Commands.add('addCard', addCard);
