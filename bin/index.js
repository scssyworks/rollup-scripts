#!/usr/bin/env node
const build = require('./rollup-scripts');
const args = require('yargs').argv;

const cmd = args._[0];
if (cmd === 'build') {
    build();
}