describe(
  'Create board api test',
  { env: { hideCredentials: true } },
  async () => {
    before(() => {
      // reset database state
      cy.resetMutation({});
    });

    it('Create board should fail if no name is provided', () => {
      cy.createBoard(
        {
          input: {
            name: '',
          },
        },
        data => {
          expect(data).to.not.be.null;
          expect(data?.createBoard.__typename).to.be.eq('ValidationError');
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
        }
      );
    });
  }
);
