import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Presentational card shown on the mini2 home screen. Kept free of navigation
 * so it can be unit-tested (and reused) in isolation.
 */
export default function LikesCard() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.card}>
      <Text style={styles.badge}>🛰️ mini2 remote · own stack</Text>
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
  card: {
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
