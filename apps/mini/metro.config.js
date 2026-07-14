const { withZephyr } = require("zephyr-metro-plugin");
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = (async () => { const __zephyrConfig = await mergeConfig(getDefaultConfig(__dirname), config); return withZephyr()(typeof __zephyrConfig === "function" ? await __zephyrConfig() : __zephyrConfig); })();
