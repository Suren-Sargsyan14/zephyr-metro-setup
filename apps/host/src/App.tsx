import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

/**
 * Module Federation host shell. Ready to consume remotes (wired in next).
 */
export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.heading}>Host app</Text>
        <Text style={styles.subheading}>
          Module Federation host — ready to consume remotes.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  content: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  heading: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subheading: { fontSize: 15, color: '#4b5563', lineHeight: 22 },
});
