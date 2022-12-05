import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { config as configDotenv } from 'dotenv';

configDotenv();

const env: { [name: string]: string } = {};

const e2ePresets = nxE2EPreset(__dirname);

Object.keys(process.env)
  .filter(key => key && key.startsWith('NX_'))
  .forEach(key => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    env[key] = process.env[key];
  });

module.exports = defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  video: true,
  videosFolder: '../../dist/cypress/apps/api-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/api-e2e/screenshots',
  chromeWebSecurity: false,
  pageLoadTimeout: 80000,
  defaultCommandTimeout: 5500,
  env,
  projectId: process.env.NX_CY_PROJECTID,
  videoUploadOnPasses: false,

  e2e: {
    ...e2ePresets,
    specPattern: './src/e2e/**/*.cy.{ts,tsx}',
    supportFile: './src/support/e2e.ts',
    experimentalSessionAndOrigin: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
