describe('Get board api test', { env: { hideCredentials: true } }, async () => {
  before(() => {
    // reset database state
    cy.resetMutation({});
  });

  it('Get boards should return empty array', () => {
    cy.getBoards({}, data => {
      expect(data).to.not.be.null;
      expect(data?.__typename).to.be.eq('Query');
      expect(data?.boards?.length).to.be.eq(0);
    });
  });

  it('Get boards should return one item', () => {
    cy.createBoard(
      {
        input: {
          name: 'Test board 1',
        },
      },
      () => {
        cy.getBoards({}, data => {
          expect(data).to.not.be.null;
          expect(data?.__typename).to.be.eq('Query');
          expect(data?.boards?.length).to.be.eq(1);
          expect(data?.boards?.[0]?.name).to.be.eq('Test board 1');
        });
      }
    );
  });
});
