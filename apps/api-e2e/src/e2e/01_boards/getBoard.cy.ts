describe('Get board api test', { env: { hideCredentials: true } }, async () => {
  before(() => {
    // reset database state
    cy.resetMutation({});
  });

  it('Get board should return NotFoundError', () => {
    cy.getBoard(
      {
        boardId: -1,
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.board.__typename).to.be.eq('NotFoundError');
      }
    );
  });

  it('Get board should return one item', () => {
    cy.createBoard(
      {
        input: {
          name: 'Test board 1',
        },
      },
      data => {
        cy.getBoard(
          {
            boardId:
              data?.createBoard?.__typename === 'Board'
                ? data.createBoard.id
                : -1,
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.board?.__typename).to.be.eq('Board');
            if (data?.board?.__typename === 'Board') {
              expect(data?.board?.name).to.be.eq('Test board 1');
            }
          }
        );
      }
    );
  });
});
