// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.((j|t)sx?|svg|css)$': 'babel-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  coverageDirectory: '.coverage',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/__mocks__/']
};
