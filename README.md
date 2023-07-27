[![CodeQL](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml)

<img src="./logo/rollup-scripts.svg" width="100px" />

# Rollup Scripts

Rollup scripts is a "zero config" bundler for `JavaScript` and `TypeScript`
libraries.

### What does that mean?

Rollup scripts is designed to work out of the box for majority of `JS` and `TS`
projects. It wraps the core functionality of `Rollup` in a smart way, therefore
eliminating the need for setting up projects and configurations from scratch.

# Roadmap

https://github.com/scssyworks/rollup-scripts/blob/main/ROADMAP.md

# Getting started

1. Create an npm project

```sh
npm init -y
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
    "lint": "rollup-scripts lint",
    "init": "rollup-scripts init"
  }
}
```

6. Run command `npm run build` to compile the code.

## NOTE:

Rollup scripts currently supports compilation for `JavaScript`, `TypeScript`,
`React` and `Preact` projects. We are working to add support for `Angular`,
`Vue` and `Svelte` projects as well.

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
