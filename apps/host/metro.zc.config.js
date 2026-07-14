const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withZephyr } = require('zephyr-metro-plugin');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Zephyr-wrapped host config. Used when ZC=1.
 * The remote URLs are resolved by Zephyr Cloud at build time from the
 * "zephyr:dependencies" field in package.json instead of localhost.
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const miniPort = process.env.MINI_APP_PORT ?? '8082';
const mini2Port = process.env.MINI2_APP_PORT ?? '8083';

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
  '@react-navigation/native': {
    singleton: true,
    eager: true,
    requiredVersion: '7.3.8',
    version: '7.3.8',
  },
  'react-native-screens': {
    singleton: true,
    eager: true,
    requiredVersion: '4.26.1',
    version: '4.26.1',
  },
  'react-native-safe-area-context': {
    singleton: true,
    eager: true,
    requiredVersion: '5.8.0',
    version: '5.8.0',
  },
};

const getConfig = async () => {
  const zephyrConfig = await withZephyr()({
    name: 'host',
    remotes: {
      mini: `mini@http://localhost:${miniPort}/mf-manifest.json`,
      mini2: `mini2@http://localhost:${mini2Port}/mf-manifest.json`,
    },
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
