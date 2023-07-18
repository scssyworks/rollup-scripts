const { jsxImportSource } = require('../utils');

module.exports = ({ typescript, react, preact }) => {
  const isJSX = react || preact;
  return {
    $schema: 'https://json.schemastore.org/swcrc',
    jsc: {
      parser: {
        decorators: true,
        dynamicImport: true,
        ...(typescript
          ? {
              syntax: 'typescript',
              ...(isJSX ? { tsx: true } : {}),
            }
          : {
              ...(isJSX ? { jsx: true } : {}),
              privateMethod: true,
              classPrivateProperty: true,
              topLevelAwait: true,
            }),
      },
      transform: {
        decoratorVersion: '2022-03', // Should be 2023-05 but swc is lagging behind
        ...(isJSX
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
