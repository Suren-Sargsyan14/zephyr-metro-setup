const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withZephyr } = require('zephyr-metro-plugin');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Zephyr-wrapped config. Used when ZC=1 (deploy).
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: { useWatchman: false },
};

const shared = {
  react: {
    singleton: true,
    eager: false,
    requiredVersion: '19.2.3',
    version: '19.2.3',
    import: false,
  },
  'react-native': {
    singleton: true,
    eager: false,
    requiredVersion: '0.86.0',
    version: '0.86.0',
    import: false,
  },
};

const getConfig = async () => {
  const zephyrConfig = await withZephyr()({
    name: 'mini2',
    filename: 'mini2.bundle',
    exposes: {
      './MiniButton': './src/MiniButton.tsx',
    },
    shared,
    shareStrategy: 'version-first',
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
