describe(
  'Delete board api test',
  { env: { hideCredentials: true } },
  async () => {
    before(() => {
      // reset database state
      cy.resetMutation({});
    });

    it("Delete board should fail if board doesn't exists", () => {
      cy.deleteBoard(
        {
          boardId: 1,
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.deleteBoard.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Board should be successfully created', () => {
      cy.createBoard(
        {
          input: {
            name: 'Test board 1',
          },
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.createBoard?.__typename).to.be.eq('Board');
          if (data?.createBoard?.__typename === 'Board') {
            cy.deleteBoard(
              {
                boardId: data.createBoard.id,
              },
              data => {
                expect(data).to.not.be.null;
                expect(data?.deleteBoard.__typename).to.be.eq('Board');
              }
            );
          }
        }
      );
    });
  }
);
