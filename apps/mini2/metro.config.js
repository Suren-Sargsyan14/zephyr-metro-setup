// Toggle between plain Module Federation (local dev) and Zephyr (deploy).
// Set ZC=1 to build/serve through Zephyr Cloud.
const getMfConfig = require('./metro.mf.config.js');
const getZephyrConfig = require('./metro.zc.config.js');

const isZephyr = Boolean(process.env.ZC);

module.exports = isZephyr ? getZephyrConfig() : getMfConfig();
