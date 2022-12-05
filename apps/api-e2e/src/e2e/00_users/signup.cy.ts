import { USER_NAME, USER_PASSWORD } from '../constants';

describe('Signup api test', { env: { hideCredentials: true } }, async () => {
  before(() => {
    // reset database state
    cy.resetMutation({});
  });

  it('Sign in should failed for empty inputs', () => {
    cy.signup(
      {
        input: {
          email: USER_NAME,
          password: '',
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.signup.__typename).to.be.eq('ValidationError');
      }
    );

    cy.signup(
      {
        input: {
          email: '',
          password: USER_PASSWORD,
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.signup.__typename).to.be.eq('ValidationError');
      }
    );
  });

  it('User should be successfully registered', () => {
    cy.signup(
      {
        input: {
          email: USER_NAME,
          password: USER_PASSWORD,
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.signup.__typename).to.be.eq('LoginData');
        if (data?.signup.__typename === 'LoginData') {
          expect(data?.signup.token).to.not.be.null;
        }
      }
    );
  });

  it('Sign in should failed if user is already registered', () => {
    cy.signup(
      {
        input: {
          email: USER_NAME,
          password: USER_PASSWORD,
        },
      },
      data => {
        expect(data).to.not.be.null;
        expect(data?.signup.__typename).to.be.eq('ValidationError');
      }
    );
  });
});
