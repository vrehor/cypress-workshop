describe(
  'Update board api test',
  { env: { hideCredentials: true } },
  async () => {
    before(() => {
      // reset database state
      cy.resetMutation({});
    });

    it("Update board should fail if board doesn't exists", () => {
      cy.updateBoard(
        {
          boardId: -1,
          input: {
            name: 'Test name',
          },
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.updateBoard.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Board should be successfully updated', () => {
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
            cy.updateBoard(
              {
                boardId: data.createBoard.id,
                input: {
                  name: 'New name',
                  starred: true,
                },
              },
              data => {
                expect(data).to.not.be.null;
                expect(data?.updateBoard.__typename).to.be.eq('Board');
                if (data?.updateBoard.__typename === 'Board') {
                  expect(data?.updateBoard.name).to.be.eq('New name');
                  expect(data?.updateBoard.starred).to.be.eq(true);
                }
              }
            );
          }
        }
      );
    });
  }
);
