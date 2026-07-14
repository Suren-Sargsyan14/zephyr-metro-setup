import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Exposed by the `mini2` remote over Module Federation as `mini2/MiniButton`.
 * A second, independent remote — the host loads this at runtime alongside the
 * `mini` remote. None of this code ships in the host binary.
 */
export default function MiniButton() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>🛰️ Remote module · served by Zephyr</Text>
      <Text style={styles.title}>Hello from Mini Two!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setLikes(n => n + 1)}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>❤️ {likes} likes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    alignItems: 'center',
    gap: 12,
  },
  badge: { fontSize: 12, color: '#047857', fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '700', color: '#064e3b' },
  button: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
});
