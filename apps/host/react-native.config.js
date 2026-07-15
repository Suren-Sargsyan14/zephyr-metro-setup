// Registers the `bundle-mf-host` command for the React Native Community CLI.
// A Module Federation HOST needs this (not the stock `bundle`) to produce a
// release JS bundle: it resolves the federated remote imports (mini/MiniApp,
// mini2/MiniApp). Wrapped with zephyrCommandWrapper so that, under Zephyr,
// the remotes in "zephyr:dependencies" resolve to their deployed Zephyr Cloud
// URLs and get baked into the bundle.
//
// The Xcode "Bundle React Native code and images" phase is pointed at this via
// `export BUNDLE_COMMAND=bundle-mf-host` in ios/.xcode.env.local.
const commands = require('@module-federation/metro-plugin-rnc-cli');
const { updateManifest } = require('@module-federation/metro');
const { zephyrCommandWrapper } = require('zephyr-metro-plugin');

const wrappedFuncPromise = zephyrCommandWrapper(
  commands.bundleMFHostCommand.func,
  commands.loadMetroConfig,
  () => {
    updateManifest(
      global.__METRO_FEDERATION_MANIFEST_PATH,
      global.__METRO_FEDERATION_CONFIG,
    );
  },
);

const zephyrHostCommand = {
  name: 'bundle-mf-host',
  description:
    'Bundles a Module Federation host, resolving remotes from Zephyr Cloud',
  func: async (...args) => {
    const wrappedFunc = await wrappedFuncPromise;
    return wrappedFunc(...args);
  },
  options: commands.bundleMFHostCommand.options,
};

module.exports = {
  commands: [zephyrHostCommand],
};
