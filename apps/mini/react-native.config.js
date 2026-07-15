// Registers the `bundle-mf-remote` command for the React Native Community CLI.
// This is what bundles the exposed modules (the container entry + ./MiniButton)
// so a host can consume them. Wrapped with zephyrCommandWrapper so that, under
// ZC=1, the produced bundle is uploaded to Zephyr Cloud.
const commands = require('@module-federation/metro-plugin-rnc-cli');
const { updateManifest } = require('@module-federation/metro');
const { zephyrCommandWrapper } = require('zephyr-metro-plugin');

// Only route through Zephyr (upload + browser OAuth) when ZC=1. Without it, a
// plain `bundle-mf-remote` produces a local bundle with no `zephyr login`.
const useZephyr = Boolean(process.env.ZC);

const wrappedFuncPromise = zephyrCommandWrapper(
  commands.bundleMFRemoteCommand.func,
  commands.loadMetroConfig,
  () => {
    updateManifest(
      global.__METRO_FEDERATION_MANIFEST_PATH,
      global.__METRO_FEDERATION_CONFIG,
    );
  },
);

const zephyrCommand = {
  name: 'bundle-mf-remote',
  description:
    'Bundles a Module Federation remote, including its container entry and all exposed modules for consumption by host applications',
  func: async (...args) => {
    if (!useZephyr) {
      return commands.bundleMFRemoteCommand.func(...args);
    }
    const wrappedFunc = await wrappedFuncPromise;
    return wrappedFunc(...args);
  },
  options: commands.bundleMFRemoteCommand.options,
};

module.exports = {
  commands: [zephyrCommand],
};
