const { jsxImportSource } = require('../utils');

module.exports = ({ typescript, react, preact }) => {
  return {
    $schema: 'https://json.schemastore.org/swcrc',
    jsc: {
      parser: {
        jsx: react || preact,
        decorators: true,
        topLevelAwait: true,
        dynamicImport: true,
        ...(typescript
          ? {
              syntax: 'typescript',
              tsx: react || preact,
            }
          : {}),
      },
      ...(react || preact
        ? {
            transform: {
              react: {
                runtime: 'automatic',
                importSource: jsxImportSource(),
              },
            },
          }
        : {}),
    },
  };
};
