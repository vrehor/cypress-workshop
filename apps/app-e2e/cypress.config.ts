import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { nxComponentTestingPreset } from '@nrwl/react/plugins/component-testing';
import { defineConfig } from 'cypress';
import { config as configDotenv } from 'dotenv';

import { registerNodeScripts } from '../../scripts/registerNodeScripts';

configDotenv();

const env: { [name: string]: string } = {};

const componentsPresets = nxComponentTestingPreset(__filename, {
  bundler: 'webpack',
});

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
  videosFolder: '../../dist/cypress/apps/app-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/app-e2e/screenshots',
  chromeWebSecurity: false,
  viewportHeight: parseInt(process.env.NX_CY_VIEWPORT_HEIGHT ?? '900'),
  viewportWidth: parseInt(process.env.NX_CY_VIEWPORT_WIDTH ?? '1440'),
  env,
  projectId: process.env.NX_CY_PROJECTID,
  videoUploadOnPasses: false,

  component: {
    ...componentsPresets,
    devServer: {
      bundler: 'webpack',
      framework: 'react',
      ...componentsPresets.devServer,
    },
    specPattern: './src/components/**/*.cy.{ts,tsx}',
    supportFile: './src/support/component.ts',
  },

  e2e: {
    ...e2ePresets,
    specPattern: './src/e2e/**/*.cy.{ts,tsx}',
    supportFile: './src/support/e2e.ts',
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on) {
      registerNodeScripts(on);
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
