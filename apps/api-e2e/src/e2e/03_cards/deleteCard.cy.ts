describe(
  'Delete card api test',
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

    it("Delete card should fail if board list doesn't exists", () => {
      cy.deleteCard(
        {
          cardId: -1,
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.deleteCard.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Card should be successfully deleted', () => {
      cy.get<number>('@boardListId').then(boardListId => {
        cy.createCard(
          {
            listId: boardListId,
            input: {
              name: 'Test name',
              order: 1,
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.createCard.__typename).to.be.eq('Card');
            if (data?.createCard.__typename === 'Card') {
              cy.deleteCard(
                {
                  cardId: data.createCard.id,
                },
                data => {
                  expect(data).to.not.be.null;
                  expect(data?.deleteCard.__typename).to.be.eq('Card');
                }
              );
            }
          }
        );
      });
    });
  }
);
