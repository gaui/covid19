// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.((j|t)sx?|css)$': 'babel-jest',
    '^.+\\.(html|svg)?$': 'jest-raw-loader'
  },
  coverageDirectory: '.coverage',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/__mocks__/']
};
