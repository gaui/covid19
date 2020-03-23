// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestBaseConfig = require('./jest.base.config');

module.exports = {
  ...jestBaseConfig,
  displayName: 'root',
  testEnvironment: 'node',
  projects: ['<rootDir>/packages/*/jest.config.js']
};
