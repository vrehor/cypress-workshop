export const isMobile = () => {
  return Cypress.config('viewportWidth') < 480;
};

export const isTablet = () => {
  return (
    Cypress.config('viewportWidth') > 480 &&
    Cypress.config('viewportWidth') < 998
  );
};

export const isDesktop = () => {
  return Cypress.config('viewportWidth') >= 998;
};

export const delayResponse = (delay: number) => {
  cy.api({
    method: 'POST',
    url: `http://localhost:3333/api/delay?delay=${delay}`,
  });
};
