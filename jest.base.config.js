module.exports = {
  transform: {
    '^.+\\.((j|t)sx?|css)$': 'babel-jest',
    '^.+\\.(html|svg)?$': 'jest-raw-loader'
  },
  coverageDirectory: '.coverage',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/__mocks__/']
};
