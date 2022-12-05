declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy-* attribute.
       * @example cy.getBySelLike('greeting')
       */
      getBySelLike: typeof getBySelLike;
    }
  }
}

export const getBySelLike = (selector: string, ...args: any[]) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
};
