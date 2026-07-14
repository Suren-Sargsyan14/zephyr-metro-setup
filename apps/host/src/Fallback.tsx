import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

/**
 * Shown while the Module Federation async boundary initialises shared modules.
 */
export default function Fallback() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={styles.text}>Starting host…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 16,
    color: '#111827',
    fontSize: 15,
  },
});
