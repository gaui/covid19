const babelDefaultEnvOpts = {
  corejs: 3,
  useBuiltIns: 'usage'
};

const presets = [
  ['@babel/env', babelDefaultEnvOpts],
  '@babel/typescript',
  '@babel/react'
];

const plugins = [];

const config = {
  env: {
    test: {
      presets: [
        ['@babel/env', { ...babelDefaultEnvOpts }],
        '@babel/typescript'
      ],
      plugins: [...plugins]
    },
    development: {
      presets: [['@babel/env', { targets: 'last 1 Chrome version' }]],
      plugins: []
    }
  },
  presets,
  plugins
};

module.exports = config;
