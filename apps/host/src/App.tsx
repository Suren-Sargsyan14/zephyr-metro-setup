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
 * Neither card ships in this app's bundle. Each is loaded at runtime over
 * Module Federation from a separate remote (served locally in dev, or from
 * Zephyr Cloud once deployed).
 */
// @ts-expect-error - virtual module resolved by Module Federation at runtime
const MiniButton = React.lazy(() => import('mini/MiniButton'));
// @ts-expect-error - virtual module resolved by Module Federation at runtime
const Mini2Button = React.lazy(() => import('mini2/MiniButton'));

function RemoteSlot({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.remoteSlot}>
      <Suspense
        fallback={
          <View style={styles.loading}>
            <ActivityIndicator color="#4f46e5" />
            <Text style={styles.loadingText}>Loading {label} remote…</Text>
          </View>
        }>
        {children}
      </Suspense>
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Host app</Text>
        <Text style={styles.subheading}>
          The cards below are federated modules loaded from the{' '}
          <Text style={styles.mono}>mini</Text> and{' '}
          <Text style={styles.mono}>mini2</Text> remotes via Zephyr.
        </Text>

        <RemoteSlot label="mini">
          <MiniButton />
        </RemoteSlot>
        <RemoteSlot label="mini2">
          <Mini2Button />
        </RemoteSlot>
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
