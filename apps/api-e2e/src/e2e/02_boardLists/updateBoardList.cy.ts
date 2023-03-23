describe(
  'Update board list api test',
  { env: { hideCredentials: true } },
  async () => {
    before(() => {
      // reset database state
      cy.resetMutation({});
    });

    beforeEach(() => {
      cy.createBoard(
        {
          input: {
            name: 'Test board name',
          },
        },
        data => {
          // @ts-ignore
          cy.wrap(data?.createBoard?.id).as('boardId');
        }
      );
    });

    it("Update board list should fail if board list doesn't exists", () => {
      cy.updateBoardList(
        {
          listId: -1,
          input: {
            name: 'New name',
            order: 2,
          },
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.updateBoardList.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Board list should be successfully updated', () => {
      cy.get('@boardId').then(boardId => {
        cy.createBoardList(
          {
            // @ts-ignore
            boardId: boardId,
            input: {
              name: 'Test list',
              order: 1,
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.createBoardList.__typename).to.be.eq('BoardList');
            if (data?.createBoardList?.__typename === 'BoardList') {
              cy.updateBoardList(
                {
                  listId: data.createBoardList.id,
                  input: {
                    name: 'New name',
                    order: 2,
                  },
                },
                data => {
                  expect(data).to.not.be.null;
                  expect(data?.updateBoardList.__typename).to.be.eq(
                    'BoardList'
                  );
                  if (data?.updateBoardList?.__typename === 'BoardList') {
                    expect(data?.updateBoardList.name).to.be.eq('New name');
                    expect(data?.updateBoardList.order).to.be.eq(2);
                  }
                }
              );
            }
          }
        );
      });
    });
  }
);
