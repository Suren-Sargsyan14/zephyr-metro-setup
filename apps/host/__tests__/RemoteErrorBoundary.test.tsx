/**
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import RemoteErrorBoundary from '../src/RemoteErrorBoundary';

function Boom(): React.JSX.Element {
  throw new Error('remote blew up');
}

const findText = (tree: ReactTestRenderer.ReactTestRenderer): string =>
  JSON.stringify(tree.toJSON());

test('renders children when the remote is healthy', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <RemoteErrorBoundary label="mini">
        <Text>healthy remote</Text>
      </RemoteErrorBoundary>,
    );
  });
  expect(findText(tree)).toContain('healthy remote');
});

test('renders a fallback with the label when the remote throws', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <RemoteErrorBoundary label="mini2">
        <Boom />
      </RemoteErrorBoundary>,
    );
  });
  const output = findText(tree);
  expect(output).toContain('mini2');
  expect(output).toContain('Retry');
});
