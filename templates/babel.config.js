const { opts, jsxImportSource } = require('../utils');

module.exports = ({ typescript, react, preact }) => ({
  presets: [
    '@babel/preset-env',
    ...opts(react || preact, [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          production: process.env.NODE_ENV === 'production',
          importSource: jsxImportSource(),
        },
      ],
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
    ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
    '@babel/plugin-proposal-private-methods',
    ['@babel/plugin-transform-runtime', { regenerator: true }],
  ],
});
