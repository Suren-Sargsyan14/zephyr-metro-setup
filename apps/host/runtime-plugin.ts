import type { FederationRuntimePlugin } from '@module-federation/runtime';

/**
 * Module Federation runtime plugin (build-time injected via metro config).
 * Handy hook point for logging/instrumenting shared-module resolution.
 */
export default function (): FederationRuntimePlugin {
  return {
    name: 'host-runtime-plugin',
    beforeLoadShare(args) {
      console.log('[MF] beforeLoadShare', args.pkgName);
      return args;
    },
  };
}
