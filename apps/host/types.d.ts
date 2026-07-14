// Type declarations for the federated modules loaded at runtime from the
// `mini` and `mini2` remotes. There are no local files behind these imports —
// Module Federation resolves them from each remote's manifest.
declare module 'mini/MiniApp' {
  import type React from 'react';
  const MiniApp: React.ComponentType;
  export default MiniApp;
}

declare module 'mini2/MiniApp' {
  import type React from 'react';
  const MiniApp: React.ComponentType;
  export default MiniApp;
}
