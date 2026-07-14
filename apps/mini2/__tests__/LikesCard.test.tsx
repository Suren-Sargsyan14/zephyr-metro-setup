/**
 * @format
 */

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import LikesCard from '../src/LikesCard';

const json = (tree: ReactTestRenderer.ReactTestRenderer): string =>
  JSON.stringify(tree.toJSON());

/** The likes label is split across text fragments ("❤️ ", n, " likes"). */
const likesLabel = (tree: ReactTestRenderer.ReactTestRenderer): string => {
  const button = tree.root.findByType(TouchableOpacity);
  const text = button.findByType(Text);
  return ([] as unknown[]).concat(text.props.children).join('');
};

test('renders the mini2 greeting with zero likes', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<LikesCard />);
  });
  expect(json(tree)).toContain('Hello from Mini Two!');
  expect(likesLabel(tree)).toBe('❤️ 0 likes');
});

test('increments likes when pressed', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<LikesCard />);
  });
  await ReactTestRenderer.act(() => {
    tree.root.findByType(TouchableOpacity).props.onPress();
  });
  expect(likesLabel(tree)).toBe('❤️ 1 likes');
});
