#!/usr/bin/env node
const { build, init } = require('./rollup-scripts');
const { cmd } = require('../utils');

if (cmd === 'build') {
	build();
}
if (cmd === 'init') {
	init();
}
