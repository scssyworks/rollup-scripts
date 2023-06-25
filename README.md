[![CodeQL](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml)

<img src="./logo/rollup-scripts.svg" width="100px" />

# Rollup scripts

Rollup scripts is a next generation "zero configuration" compiler for JavaScript
and TypeScript libraries.

### What does that mean?

Rollup scripts is designed to work out of the box for majority of `JavaScript`
and `TypeScript` projects. It smartly wraps the core functionality of `Rollup`
thereby eliminating the need of setting up the manual configuration.

```sh
# Configure rollup
npx rollup-scripts init
```

# Roadmap

https://github.com/scssyworks/rollup-scripts/blob/main/ROADMAP.md

# Getting started

1. Create an npm project

```sh
npm init
```

2. Install `rollup-scripts`. **NOTE:** Do not install this package globally!

```sh
npm i -D --save-exact rollup-scripts
```

3. If you are testing a forked repository:

```sh
npm i -D --save-exact github:{your username}/rollup-scripts
```

4. Create an `src` folder and an entry file `index.js` with a valid `JavaScript`
   code.

```sh
mkdir src
touch src/index.mjs
```

5. Update `package.json` file as follows

```json
{
  "main": "dist/umd/index.js",
  "module": "dist/esm/index.mjs",
  "scripts": {
    "build": "rollup-scripts build",
    "lint": "rollup-scripts lint"
  }
}
```

6. Run command `npm run build` to compile the code.

## NOTE:

Rollup scripts supports compilation for `JavaScript`, `TypeScript`, `React` and
`Preact` projects.

```sh
npx rollup-scripts build
```

# Available commands

Rollup-scripts supports `init`, `build` and `lint` scripts. For more details
run:

```sh
npx rollup-scripts --help
```

## This package is currently experimental and in active development. Version 0.0.x is unstable and should be used only for trial purposes.

https://github.com/scssyworks/rollup-scripts/issues
