const { typescript, react } = require("../../utils");

module.exports = {
    presets: [
        '@babel/preset-env',
        ...(react ? ['@babel/preset-react'] : []),
        ...(typescript ? ['@babel/preset-typescript'] : []),
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-optional-chaining',
        ['@babel/plugin-proposal-decorators', { "version": "2023-05" }],
        '@babel/plugin-proposal-private-methods',
        ['@babel/plugin-transform-runtime', { regenerator: true }]
    ]
};