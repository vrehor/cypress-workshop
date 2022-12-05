describe('Open app', async () => {
  before(() => {
    console.log('before');
  });

  beforeEach(() => {
    console.log('before each');
  });

  afterEach(() => {
    console.log('after each');
  });

  after(() => {
    console.log('after');
  });

  it('opening the trello application', () => {
    cy.visit('/');

    cy.visit('/boards/1');

    cy.visit('/boards/1?card=1');

    cy.visit('/board/1', {
      qs: {
        card: 1,
      },
    });
  });
});
