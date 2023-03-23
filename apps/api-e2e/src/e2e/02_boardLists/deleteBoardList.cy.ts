describe(
  'Delete board list api test',
  { env: { hideCredentials: true } },
  async () => {
    before(() => {
      // reset database state
      cy.resetMutation({});
    });

    beforeEach(() => {
      // reset database state
      cy.createBoard(
        {
          input: {
            name: 'Test board name',
          },
        },
        data => {
          cy.wrap(
            data?.createBoard?.__typename === 'Board' ? data.createBoard.id : -1
          ).as('boardId');
          cy.createBoardList(
            {
              // @ts-ignore
              boardId: data.createBoard.id,
              input: {
                name: 'Test name',
                order: 1,
              },
            },
            data => {
              // @ts-ignore
              cy.wrap(data?.createBoardList?.id).as('boardListId');
            }
          );
        }
      );
    });

    it("Delete board list should fail if board list doesn't exists", () => {
      cy.deleteBoardList(
        {
          listId: -1,
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.deleteBoardList.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Board list should be successfully deleted', () => {
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
              cy.deleteBoardList(
                {
                  listId: data.createBoardList.id,
                },
                data => {
                  expect(data).to.not.be.null;
                  expect(data?.deleteBoardList.__typename).to.be.eq(
                    'BoardList'
                  );
                }
              );
            }
          }
        );
      });
    });
  }
);
