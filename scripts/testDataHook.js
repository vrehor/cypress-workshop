const seedScriptPath = './';

const beforeTestSeeds = {
  'src/e2e/01_open_app/challenge_solution.cy.ts': `${seedScriptPath}singleBoardSingleListThreeCards.ts`,
  'src/e2e/03_writing_first_test/challenge_solution.cy.ts': `${seedScriptPath}twoBoards.ts`,
  'src/e2e/05_effective_command_chaining/challenge.cy.ts': `${seedScriptPath}singleBoardTwoListsFiveCards.ts`,
  'src/e2e/05_effective_command_chaining/challenge_solution.cy.ts': `${seedScriptPath}singleBoardTwoListsFiveCards.ts`,
  'src/e2e/06_testing_dynamic_pages/challenge.cy.ts': `${seedScriptPath}singleBoardTwoListsFiveCards.ts`,
  'src/e2e/06_testing_dynamic_pages/challenge_solution.cy.ts': `${seedScriptPath}singleBoardTwoListsFiveCards.ts`,
  'src/e2e/07_handling_data_within_test/challenge.cy.ts': `${seedScriptPath}singleBoardSingleListSingleCard.ts`,
  'src/e2e/07_handling_data_within_test/challenge_solution.cy.ts': `${seedScriptPath}singleBoardSingleListSingleCard.ts`,
  'src/e2e/08_creating_custom_commands/challenge.cy.ts': `${seedScriptPath}singleBoard.ts`,
  'src/e2e/08_creating_custom_commands/challenge_solution.cy.ts': `${seedScriptPath}singleBoard.ts`,
  'src/e2e/12_handling_authentication_flow/challenge_solution.cy.ts': `${seedScriptPath}singleBoardSingleListThreeCardsTwoUsers.ts`,
};

const beforeEachTestSeeds = {
  'src/e2e/04_making_assertions/challenge_solution.cy.ts': `${seedScriptPath}singleBoardSingleListSingleCard.ts`,
  'src/e2e/09_intercepting_network_requests/challenge.cy.ts': `${seedScriptPath}singleBoardSingleList.ts`,
  'src/e2e/09_intercepting_network_requests/challenge_solution.cy.ts': `${seedScriptPath}singleBoardSingleList.ts`,
  'src/e2e/11_plugins/challenge.cy.ts': `${seedScriptPath}singleBoardTwoListsTwoCards.ts`,
  'src/e2e/11_plugins/challenge_solution.cy.ts': `${seedScriptPath}singleBoardTwoListsTwoCards.ts`,
};

before(() => {
  const path = Cypress.platform.includes('win')
    ? Cypress.spec.relative.replaceAll('\\', '/')
    : Cypress.spec.relative;

  const dbState = beforeTestSeeds[`${path}`];

  if (dbState) {
    cy.task('cleanTestData', { log: false });
    cy.task('seedTestData', dbState, { log: false });
    cy.log('💡 Database was wiped and seeded before all tests', dbState);
  }
});

beforeEach(() => {
  const path = Cypress.platform.includes('win')
    ? Cypress.spec.relative.replaceAll('\\', '/')
    : Cypress.spec.relative;

  const dbState = beforeEachTestSeeds[`${path}`];

  if (dbState) {
    cy.task('cleanTestData', { log: false });
    cy.task('seedTestData', dbState, { log: false });
    cy.log('💡 Database was wiped and seeded before each test', dbState);
  }
});
