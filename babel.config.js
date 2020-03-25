const babelDefaultEnvOpts = {
  corejs: 3,
  useBuiltIns: 'usage'
};

const babelESModulesEnvOpts = {
  targets: { esmodules: true }
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
        ['@babel/env', { ...babelDefaultEnvOpts, ...babelESModulesEnvOpts }],
        '@babel/typescript',
        '@babel/react'
      ],
      plugins
    },
    development: {
      presets: [
        ['@babel/env', { ...babelDefaultEnvOpts, ...babelESModulesEnvOpts }],
        '@babel/typescript',
        '@babel/react'
      ],
      plugins
    }
  },
  presets,
  plugins
};

module.exports = config;
