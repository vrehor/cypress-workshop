declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getBySel: typeof getBySel;
    }
  }
}

export const getBySel = (selector: string | string[], ...args: any[]) => {
  if (typeof selector === 'string') {
    return cy.get(`[data-cy=${selector}]`, ...args);
  } else {
    return cy.get(
      (selector as string[]).map(itm => `[data-cy=${itm}]`).join(' '),
      ...args
    );
  }
};
