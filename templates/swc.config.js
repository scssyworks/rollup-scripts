const { jsxImportSource } = require('../utils');

module.exports = ({ typescript, react, preact }) => {
  return {
    $schema: 'https://json.schemastore.org/swcrc',
    jsc: {
      parser: {
        jsx: react || preact,
        decorators: true,
        privateMethod: true,
        classPrivateProperty: true,
        topLevelAwait: true,
        dynamicImport: true,
        ...(typescript
          ? {
              syntax: 'typescript',
              tsx: react || preact,
            }
          : {}),
      },
      transform: {
        decoratorVersion: '2022-03', // Should be 2023-05 but swc is lagging behind
        ...(react || preact
          ? {
              react: {
                runtime: 'automatic',
                importSource: jsxImportSource(),
              },
            }
          : {}),
      },
    },
  };
};
