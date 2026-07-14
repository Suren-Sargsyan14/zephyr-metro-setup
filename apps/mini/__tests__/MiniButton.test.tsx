/**
 * @format
 */

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import MiniButton from '../src/MiniButton';

const json = (tree: ReactTestRenderer.ReactTestRenderer): string =>
  JSON.stringify(tree.toJSON());

/** The button's label is composed of several text fragments ("Tapped ", n,
 * " times"); join them into one string for assertions. */
const buttonLabel = (tree: ReactTestRenderer.ReactTestRenderer): string => {
  const button = tree.root.findByType(TouchableOpacity);
  const text = button.findByType(Text);
  return ([] as unknown[]).concat(text.props.children).join('');
};

test('renders the mini greeting with a zeroed counter', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<MiniButton />);
  });
  expect(json(tree)).toContain('Hello from the Mini app!');
  expect(buttonLabel(tree)).toBe('Tapped 0 times');
});

test('increments the counter when pressed', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<MiniButton />);
  });
  await ReactTestRenderer.act(() => {
    tree.root.findByType(TouchableOpacity).props.onPress();
  });
  expect(buttonLabel(tree)).toBe('Tapped 4 times');
});
