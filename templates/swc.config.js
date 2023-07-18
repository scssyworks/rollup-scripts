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
        decoratorVersion: '2022-03', // This field is unsupported in JSON schema but is supported by SWC. Latest spec is 2023-05 which is still not supported
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
      target: 'es5',
    },
  };
};
