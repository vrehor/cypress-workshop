/// <reference types="cypress" />

// challenge #1: set up this test in a way that it resets the database before every test
beforeEach(() => {
  cy.request('POST', 'http://localhost:3333/api/reset');
});

// challenge #2: create a new board using API. check that the "created" attribute is a string
it('date created is formatted as a string', () => {
  cy.request('POST', 'http://localhost:3333/api/boards', {
    name: 'new board',
  }).then(board => {
    expect(board.body.createdAt).to.be.a('string');
  });
});

// challenge #3: make two api requests. make the first one create a board
// and make the second one check number of board in the database
it('GET http://localhost:3333/api/boards is returning correct number of boards', () => {
  cy.request('POST', 'http://localhost:3333/api/boards', { name: 'new board' });
  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/api/boards',
    headers: {
      accept: 'application/json',
    },
  })
    .its('body')
    .should('have.length', 1);
});

// challenge #4: create a new board and list. to create a new list, you’ll need
// to put it inside .then() command and use the id of the board in
// the request
it('creating a new list', () => {
  cy.request('POST', 'http://localhost:3333/api/boards', {
    name: 'new board',
  }).then(board => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/lists',
      body: {
        name: 'new list',
        boardId: board.body.id,
      },
    });
  });
});

// 💯 extra challenge: use a query parameter in GET http://localhost:3333/api/boards
// request, so that API will only return starred boards
it('filtering boards', () => {
  cy.request('POST', 'http://localhost:3333/api/boards', { name: 'board 1' });
  cy.request('POST', 'http://localhost:3333/api/boards', { name: 'board 2' });

  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/api/boards',
    qs: {
      starred: true,
    },
    headers: {
      accept: 'application/json',
    },
  })
    .its('body')
    .should('have.length', 0);
});
