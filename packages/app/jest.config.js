// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestBaseConfig = require('../../jest.base.config');

module.exports = {
  ...jestBaseConfig,
  displayName: 'app',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js']
};
