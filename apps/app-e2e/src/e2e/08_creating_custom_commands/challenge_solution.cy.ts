/// <reference types="cypress" />

// challenge #1: create three new custom commands. one for creating new board
// one for creating new list and one for creating new card
// and use them in test

import './challenge_solution.utils';

it('creates new board, list and card', () => {
  cy.visit('/');
  cy.addBoard('new board');
  cy.addList('new list');
  cy.addCard('new card');
});
