const { resolve } = require('path');
module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(firebase-admin)/)'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  globalSetup: resolve(__dirname, 'jest.setup.ts'),
  globalTeardown: resolve(__dirname, 'jest.teardown.ts'),
};
