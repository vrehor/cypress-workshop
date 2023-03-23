export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login: typeof login;
    }
  }
}

const login = (email: string, password: string) => {
  cy.session(email, () => {
    cy.visit('/login');

    cy.get('[data-cy="login-email"]').type(email);

    cy.get('[data-cy="login-password"]').type(password);

    cy.get('[data-cy="login-submit"]').click();

    cy.get('[data-cy="logged-user"]').should('be.visible');
  });
};

Cypress.Commands.add('login', login);
