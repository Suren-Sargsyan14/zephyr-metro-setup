import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * This component lives in the `mini` app and is EXPOSED over Module Federation
 * (see metro.zc.config.js -> exposes['./MiniButton']). The `host` app loads it
 * at runtime from a Zephyr-hosted bundle — the code below is never shipped
 * inside the host binary.
 */
export default function MiniButton() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>📦 Remote module · served by Zephyr</Text>
      <Text style={styles.title}>Hello from the Mini app!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(c => c + 4)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Tapped {count} times</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    fontSize: 12,
    color: '#4338ca',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e1b4b',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
});
