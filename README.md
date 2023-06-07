[![CodeQL](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml)

# rollup-scripts

A utility to simplify rollup configuration

## This package is currently experimental and in active development.

## Version 0.0.x is unstable and should be used with caution.

# Getting started

1. Create an npm project

```sh
npm init
```

2. Install `rollup-scripts`. **NOTE:** Do not install this package globally!

```sh
npm i -D --save-exact rollup-scripts
```

3. Create `src` folder and an entry file `index.mjs`

```sh
mkdir src
touch src/index.mjs
```

4. Add any valid `JavaScript` code.

5. Update `package.json` file as follows

```json
{
  "main": "dist/umd/index.js",
  "module": "dist/esm/index.mjs",
  "scripts": {
    "build": "rollup-scripts build"
  }
}
```

6. Run command `npm run build` to compile the code.

# Available commands

Rollup scripts at the moment only support `init` and `build` commands. For more
details run:

```sh
npx rollup-scripts --help
npx rollup-scripts build --help
```

## NOTE:

Rollup scripts supports compilation for JavaScript, TypeScript and
React+Typescript projects.

```sh
npx rollup-scripts build --typescript
npx rollup-scripts build --react
npx rollup-scripts build --typescript --react
```
