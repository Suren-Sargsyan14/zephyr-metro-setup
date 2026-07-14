const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Plain Module Federation config (NO Zephyr).
 * Consumes the `mini` remote from a local server (localhost:8082).
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const miniPort = process.env.MINI_APP_PORT ?? '8082';

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
  const mfConfig = {
    name: 'host',
    remotes: {
      mini: `mini@http://localhost:${miniPort}/mf-manifest.json`,
    },
    shared,
    shareStrategy: 'loaded-first',
    plugins: [path.resolve(__dirname, './runtime-plugin.ts')],
  };

  return withModuleFederation(
    mergeConfig(getDefaultConfig(__dirname), config),
    mfConfig,
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
