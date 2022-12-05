describe(
  'Update card api test',
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

    it("Update card should fail if board list doesn't exists", () => {
      cy.updateCard(
        {
          cardId: -1,
          input: {
            name: 'new name',
          },
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.updateCard.__typename).to.be.eq('NotFoundError');
        }
      );
    });

    it('Card should be successfully deleted', () => {
      const testDeadline = new Date();

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
              cy.updateCard(
                {
                  cardId: data.createCard.id,
                  input: {
                    name: 'New name',
                    order: 2,
                    deadline: testDeadline,
                    description: 'test description',
                    done: true,
                  },
                },
                data => {
                  expect(data).to.not.be.null;
                  expect(data?.updateCard.__typename).to.be.eq('Card');
                  if (data?.updateCard.__typename === 'Card') {
                    expect(data?.updateCard.name).to.be.eq('New name');
                    expect(data?.updateCard.order).to.be.eq(2);
                    expect(data?.updateCard.deadline).to.be.eq(
                      testDeadline.toISOString()
                    );
                    expect(data?.updateCard.description).to.be.eq(
                      'test description'
                    );
                    expect(data?.updateCard.done).to.be.eq(true);
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
