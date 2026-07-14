// Type declarations for the federated modules loaded at runtime from the
// `mini` and `mini2` remotes. There are no local files behind these imports —
// Module Federation resolves them from each remote's manifest.
declare module 'mini/MiniButton' {
  import type React from 'react';
  const MiniButton: React.ComponentType;
  export default MiniButton;
}

declare module 'mini2/MiniButton' {
  import type React from 'react';
  const MiniButton: React.ComponentType;
  export default MiniButton;
}
