/**
 * @format
 */

import { withAsyncStartup } from '@module-federation/metro/bootstrap';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Module Federation needs an async boundary at startup so shared modules
// (react, react-native) can initialise before the app tree renders.
// withAsyncStartup wires that up; ./src/Fallback shows while it resolves.
AppRegistry.registerComponent(
  appName,
  withAsyncStartup(
    () => require('./src/App'),
    () => require('./src/Fallback'),
  ),
);
