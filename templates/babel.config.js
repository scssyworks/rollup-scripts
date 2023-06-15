const { opts } = require('../utils');

module.exports = ({ typescript, react }) => ({
  presets: [
    '@babel/preset-env',
    ...opts(react, [
      ['@babel/preset-react', { runtime: 'automatic', production: true }],
    ]),
    ...opts(typescript, [
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ]),
  ],
  plugins: [
    '@babel/plugin-syntax-optional-chaining',
    ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
    '@babel/plugin-proposal-private-methods',
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
});
