#!/usr/bin/env node
const build = require('./rollup-scripts');
const { cmd } = require('../utils');

if (cmd === 'build') {
    build();
}