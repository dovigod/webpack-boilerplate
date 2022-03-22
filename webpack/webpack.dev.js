const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ip = require('ip');
const portFinderSync = require('portfinder-sync');

module.exports = merge(commonConfig, {
	stats: 'errors-warnings',
	mode: 'development'
});
