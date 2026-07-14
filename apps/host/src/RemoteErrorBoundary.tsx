import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  /** Name of the remote being rendered, shown in the error state. */
  label: string;
  children: React.ReactNode;
};

type State = { error: Error | null };

/**
 * Contains failures from a federated remote (failed manifest fetch, runtime
 * error in remote code, version mismatch) so one bad remote can't crash the
 * whole host. Suspense handles the *loading* state; this handles *failure*.
 */
export default class RemoteErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (__DEV__) {
      console.warn(`[MF] remote "${this.props.label}" failed:`, error.message);
    }
  }

  private reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Couldn’t load “{this.props.label}”</Text>
          <Text style={styles.message}>{error.message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.reset}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#fef2f2',
  },
  title: { fontSize: 17, fontWeight: '700', color: '#991b1b' },
  message: { fontSize: 14, color: '#7f1d1d', textAlign: 'center' },
  button: {
    marginTop: 8,
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
  },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
