describe(
  'Create card api test',
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

    it('Create card should fail if no name is provided', () => {
      cy.get<number>('@boardListId').then(boardListId => {
        cy.createCard(
          {
            listId: boardListId,
            input: {
              name: '',
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.createCard.__typename).to.be.eq('ValidationError');
          }
        );
      });
    });

    it('Card should be successfully created', () => {
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
              expect(data?.createCard.id).not.to.be.null;
              expect(data?.createCard.name).to.be.eq('Test name');
              expect(data?.createCard.order).to.be.eq(1);
            }
          }
        );
      });
    });
  }
);
