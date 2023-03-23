/// <reference types="cypress" />

// challenge #1: create a card using UI and use .intercept() command
// for watching the http request for the card creation
// test the response status code and some of the attributes
// of the card you created
import { aliasMutation, hasOperationName } from '../../support/graphql.utils';

it('creates a card', () => {
  cy.visit(`/boards/1`);

  cy.intercept('POST', 'http://localhost:3333/graphql', req => {
    aliasMutation(req, 'CreateCard');
  });

  cy.get('[data-cy="new-card"]').click();

  cy.get('[data-cy="new-card-input"]').type('card{enter}');

  cy.wait('@gqlCreateCardMutation').then(({ response, request }) => {
    expect(request.body.variables.listId).to.eq(1);
    expect(response?.statusCode).to.eq(200);
    expect(response?.body.data?.createCard?.description).to.be.null;
  });
});

// challenge #2: create and check the card you created using UI and use .intercept() command
// to catch the http request that happens. test its status code
it('checking the card', () => {
  cy.visit(`/boards/1`);

  cy.intercept('POST', 'http://localhost:3333/graphql', req => {
    aliasMutation(req, 'UpdateCard');
  });

  cy.get('[data-cy="new-card"]').click();

  cy.get('[data-cy="new-card-input"]').type('milk{enter}');

  cy.get('[data-cy="card-checkbox"]').check();

  cy.wait('@gqlUpdateCardMutation')
    .its('response.statusCode')
    .should('eq', 200);
});

// challenge #3: use the file twoBoards.json from fixtures folder,
// or create your own fixture file and use it in the test
it('shows list of boards from fixture', () => {
  cy.intercept('POST', 'http://localhost:3333/graphql', req => {
    if (hasOperationName(req, 'Boards')) {
      // Declare the alias from the initial intercept in the beforeEach
      req.alias = 'gqlBoardsQuery';
      req.reply({
        fixture: 'twoBoards',
      });
    }
  });

  cy.visit('/');

  cy.get('[data-cy=board-item').should('have.length', 2);
});

// challenge #4: try explicitly defining empty response body instead of using fixture
it('shows no boards in the list', () => {
  cy.intercept('POST', 'http://localhost:3333/graphql', req => {
    if (hasOperationName(req, 'Boards')) {
      // Declare the alias from the initial intercept in the beforeEach
      req.alias = 'gqlBoardsQuery';
      req.reply({ data: { boards: [] } });
    }
  });

  cy.visit('/');

  cy.get('[data-cy=board-item]').should('have.length', 0);
});

// challenge #5: add an attribute to the .intercept() command that will
// make the request fail
it('shows error message when creating a board', () => {
  cy.intercept('POST', 'http://localhost:3333/graphql', req => {
    if (hasOperationName(req, 'CreateBoard')) {
      // Declare the alias from the initial intercept in the beforeEach
      req.alias = 'gqlCreateBoardsQuery';
      req.reply({
        forceNetworkError: true,
      });
    }
  });

  cy.visit('/');

  cy.get('[data-cy=create-board]').click();

  cy.get('[data-cy=new-board-input]').type('garden project{enter}');

  cy.get('div.ant-notification').should('be.visible');
});
