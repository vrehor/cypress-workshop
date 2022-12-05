/// <reference types="cypress" />
// ⚠️ database data is deleted and seeded before all tests

// challenge #1: create a test that will take a board name from home page and check that it hows up in board detail
describe('board detail', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=board-item]')
      .invoke('text')
      .invoke('trim')
      .as('boardTitle');

    cy.get('[data-cy=board-item]').click();
  });

  it('has the correct name in board detail', function () {
    cy.get('[data-cy=board-title]').should('have.value', this.boardTitle);
  });
});

describe('card detail', () => {
  beforeEach(() => {
    cy.visit('/boards/1');

    cy.get('[data-cy="list-name"]')
      .invoke('text')
      .invoke('trim')
      .as('listName');

    cy.get('[data-cy="due-date"]').invoke('text').as('dueDate');
  });

  // challenge #2: create a test that will check that date on the card is the same as in card detail
  it('has the correct date in card detail', function () {
    cy.get('[data-cy=card]').click();

    cy.get('input#deadline')
      .invoke('attr', 'title')
      .should('equal', this.dueDate);
  });
});
