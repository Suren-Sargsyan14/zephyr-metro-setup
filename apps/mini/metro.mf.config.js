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

// Navigation packages are shared as singletons so the remote's nested stack
// attaches to the host's single NavigationContainer / native screens.
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
  '@react-navigation/native': {
    singleton: true,
    eager: false,
    requiredVersion: '7.3.8',
    version: '7.3.8',
    import: false,
  },
  'react-native-screens': {
    singleton: true,
    eager: false,
    requiredVersion: '4.26.1',
    version: '4.26.1',
    import: false,
  },
  'react-native-safe-area-context': {
    singleton: true,
    eager: false,
    requiredVersion: '5.8.0',
    version: '5.8.0',
    import: false,
  },
};

const getConfig = async () => {
  const mfConfig = {
    name: 'mini',
    filename: 'mini.bundle',
    exposes: {
      './MiniApp': './src/MiniApp.tsx',
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
