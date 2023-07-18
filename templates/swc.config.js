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
              syntax: 'ecmascript',
              ...(isJSX ? { jsx: true } : {}),
              privateMethod: true,
              classPrivateProperty: true,
              topLevelAwait: true,
            }),
      },
      transform: {
        legacyDecorator: false,
        decoratorMetadata: true,
        ...(isJSX
          ? {
              react: {
                runtime: 'automatic',
                importSource: jsxImportSource(),
              },
            }
          : {}),
      },
      loose: false,
    },
  };
};
