import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * `mini/MiniButton` is NOT in this app's bundle. It is loaded at runtime over
 * Module Federation from the `mini` remote (served locally in dev, or from
 * Zephyr Cloud once deployed). React.lazy + Suspense handle the async load.
 */
// @ts-expect-error - virtual module resolved by Module Federation at runtime
const MiniButton = React.lazy(() => import('mini/MiniButton'));

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Host app</Text>
        <Text style={styles.subheading}>
          The card below is a federated module loaded from the{' '}
          <Text style={styles.mono}>mini</Text> remote via Zephyr.
        </Text>

        <View style={styles.remoteSlot}>
          <Suspense
            fallback={
              <View style={styles.loading}>
                <ActivityIndicator color="#4f46e5" />
                <Text style={styles.loadingText}>Loading remote…</Text>
              </View>
            }>
            <MiniButton />
          </Suspense>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 24, gap: 16, flexGrow: 1, justifyContent: 'center' },
  heading: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subheading: { fontSize: 15, color: '#4b5563', lineHeight: 22 },
  mono: { fontFamily: 'Courier', fontWeight: '700', color: '#4338ca' },
  remoteSlot: { marginTop: 12 },
  loading: { padding: 24, alignItems: 'center', gap: 8 },
  loadingText: { color: '#6b7280' },
});
