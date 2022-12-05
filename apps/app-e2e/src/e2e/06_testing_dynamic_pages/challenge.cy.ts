/// <reference types="cypress" />
// ⚠️ database is filled with data before the test

import { delayResponse } from '../../support/utils';

beforeEach(() => {
  cy.visit('/board/1');
});

afterEach(() => {
  // cleanup slowdown
  delayResponse(500);
});

// challenge #1: add proper timeout to this test so that it passes
it('loads all the cards in board detail', () => {
  // helper to simulate late response
  delayResponse(4000);

  cy.get('[data-cy=card]').should('have.length', 5);
});

// challenge #2: if you run this test a couple of times, you will find out it is flaky. try to debug it and add a command to query chain that would make it stable
it('checks the detail of first card', () => {
  // helper to simulate late response
  delayResponse(4000);

  cy.get('[data-cy=card]').first().click();

  cy.get('[data-cy="card-detail-title"]').should('have.value', 'Milk');
});
