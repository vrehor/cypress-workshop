describe(
  'Create board list api test',
  { env: { hideCredentials: true } },
  async () => {
    beforeEach(() => {
      // reset database state
      cy.resetMutation({});
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

    it('Create board list should fail if no name is provided', () => {
      cy.get('@boardId').then(boardId => {
        cy.createBoardList(
          {
            // @ts-ignore
            boardId: boardId,
            input: {
              name: '',
              order: 1,
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.createBoardList.__typename).to.be.eq(
              'ValidationError'
            );
          }
        );
      });
    });

    it('Board should be successfully created', () => {
      cy.get('@boardId').then(boardId => {
        cy.createBoardList(
          {
            // @ts-ignore
            boardId: boardId,
            input: {
              name: 'Test name',
              order: 1,
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.createBoardList.__typename).to.be.eq('BoardList');
            if (data?.createBoardList.__typename === 'BoardList') {
              expect(data?.createBoardList.id).not.to.be.null;
              expect(data?.createBoardList.name).to.be.eq('Test name');
              expect(data?.createBoardList.order).to.be.eq(1);
            }
          }
        );
      });
    });
  }
);
