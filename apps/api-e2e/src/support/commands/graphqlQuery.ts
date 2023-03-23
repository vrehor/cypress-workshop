declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      graphqlQuery: typeof graphqlQuery;
    }
  }
}

export const graphqlQuery = <TResponse>(
  operationName: string,
  query: any,
  variables: any,
  handler?: (data: TResponse) => void
) => {
  return cy
    .api({
      url: '/',
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: {
        operationName: operationName,
        variables: variables,
        query: query,
      },
    })
    .then(response => {
      expect(response.status).to.be.eq(200);
      handler?.((response.body as unknown as { data: any })?.data as TResponse);
    });
};
