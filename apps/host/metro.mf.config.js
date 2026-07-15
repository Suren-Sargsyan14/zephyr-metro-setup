const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withModuleFederation } = require('@module-federation/metro');

/**
 * Plain Module Federation config (NO Zephyr).
 * Consumes the `mini` (:8082) and `mini2` (:8083) remotes from local servers.
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const miniPort = process.env.MINI_APP_PORT ?? '8082';
const mini2Port = process.env.MINI2_APP_PORT ?? '8083';

// Remote manifest URLs default to the local dev servers, but can be pointed at
// deployed Zephyr Cloud remotes by setting MINI_REMOTE_URL / MINI2_REMOTE_URL
// (full mf-manifest.json URLs). Lets a plain debug build consume cloud remotes.
const miniManifest =
  process.env.MINI_REMOTE_URL ?? `http://localhost:${miniPort}/mf-manifest.json`;
const mini2Manifest =
  process.env.MINI2_REMOTE_URL ??
  `http://localhost:${mini2Port}/mf-manifest.json`;

const config = {
  resolver: { useWatchman: false },
};

// The host eagerly provides the shared singletons. Navigation packages are
// shared so both remotes' nested stacks use the host's single
// NavigationContainer and one native react-native-screens instance.
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
  const mfConfig = {
    name: 'host',
    remotes: {
      mini: `mini@${miniManifest}`,
      mini2: `mini2@${mini2Manifest}`,
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
