const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withZephyr } = require('zephyr-metro-plugin');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Zephyr-wrapped host config. Used when ZC=1.
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: { useWatchman: false },
};

const shared = {
  react: {
    singleton: true,
    eager: true,
    requiredVersion: '19.2.3',
    version: '19.2.3',
  },
  'react-native': {
    singleton: true,
    eager: true,
    requiredVersion: '0.86.0',
    version: '0.86.0',
  },
};

const getConfig = async () => {
  const zephyrConfig = await withZephyr()({
    name: 'host',
    remotes: {},
    shared,
    shareStrategy: 'loaded-first',
    plugins: [path.resolve(__dirname, './runtime-plugin.ts')],
  });

  return withModuleFederation(
    mergeConfig(getDefaultConfig(__dirname), config),
    zephyrConfig,
    {
      flags: {
        unstable_patchHMRClient: true,
        unstable_patchInitializeCore: true,
        unstable_patchRuntimeRequire: true,
      },
    },
  );
};

module.exports = getConfig;
