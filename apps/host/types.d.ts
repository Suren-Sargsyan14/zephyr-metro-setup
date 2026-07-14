// Type declaration for the federated module loaded at runtime from the `mini`
// remote. There is no local file behind this import — Module Federation
// resolves it from the remote's manifest.
declare module 'mini/MiniButton' {
  import type React from 'react';
  const MiniButton: React.ComponentType;
  export default MiniButton;
}
