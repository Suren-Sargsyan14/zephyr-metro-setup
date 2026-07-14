const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Plain Module Federation config (NO Zephyr).
 * Used for local development / running the remote from localhost.
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
  const mfConfig = {
    name: 'mini',
    filename: 'mini.bundle',
    exposes: {
      './MiniButton': './src/MiniButton.tsx',
    },
    shared,
    shareStrategy: 'version-first',
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
