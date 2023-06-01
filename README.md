[![CodeQL](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/rollup-scripts/actions/workflows/codeql.yml)

# rollup-scripts

A utility to simplify rollup configuration

## This package is under development. Do not use in production!

# How to use?

1. Create an npm project

```sh
npm init
```

2. Install `rollup-scripts`. Make sure you are not installing it globally.

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
  "scripts": {
    "build": "rollup-scripts build"
  }
}
```

6. Run command `npm run build` to compile the code.
