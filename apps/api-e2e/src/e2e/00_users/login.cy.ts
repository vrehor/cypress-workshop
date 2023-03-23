import { USER_NAME, USER_PASSWORD } from '../constants';

describe('Login api test', { env: { hideCredentials: true } }, async () => {
  before(() => {
    // reset database state
    cy.resetMutation({});
  });

  it('Login should failed for non existing user', () => {
    cy.login(
      {
        input: {
          email: USER_NAME,
          password: USER_PASSWORD,
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.login.__typename).to.be.eq('AuthorizationError');
      }
    );
  });

  it('Login should failed for empty inputs', () => {
    cy.login(
      {
        input: {
          email: USER_NAME,
          password: '',
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.login.__typename).to.be.eq('ValidationError');
      }
    );

    cy.login(
      {
        input: {
          email: '',
          password: USER_PASSWORD,
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.login.__typename).to.be.eq('ValidationError');
      }
    );
  });

  it('User should be successfully logged in', () => {
    cy.signup(
      {
        input: {
          email: USER_NAME,
          password: USER_PASSWORD,
        },
      },
      () => {
        cy.login(
          {
            input: {
              email: USER_NAME,
              password: USER_PASSWORD,
            },
          },
          data => {
            expect(data).to.not.be.null;
            expect(data?.login.__typename).to.be.eq('LoginData');
            if (data?.login.__typename === 'LoginData') {
              expect(data?.login.token).to.not.be.null;
            }
          }
        );
      }
    );
  });
});
