import React, { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Host owns the single NavigationContainer and a bottom-tab navigator.
 * Each tab renders a federated stack navigator loaded at runtime from a remote:
 *   Tab 1 -> mini/MiniApp   (served on :8082)
 *   Tab 2 -> mini2/MiniApp  (served on :8083)
 * Neither remote's code ships in this binary.
 */
// @ts-expect-error - virtual module resolved by Module Federation at runtime
const MiniApp = React.lazy(() => import('mini/MiniApp'));
// @ts-expect-error - virtual module resolved by Module Federation at runtime
const Mini2App = React.lazy(() => import('mini2/MiniApp'));

function RemoteFallback({ label }: { label: string }) {
  return (
    <View style={styles.fallback}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={styles.fallbackText}>Loading {label} remote…</Text>
    </View>
  );
}

function MiniOneScreen() {
  return (
    <Suspense fallback={<RemoteFallback label="mini" />}>
      <MiniApp />
    </Suspense>
  );
}

function MiniTwoScreen() {
  return (
    <Suspense fallback={<RemoteFallback label="mini2" />}>
      <Mini2App />
    </Suspense>
  );
}

const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* headerShown:false so only each remote's own stack header shows */}
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#4f46e5',
          }}>
          <Tab.Screen
            name="MiniOne"
            component={MiniOneScreen}
            options={{
              title: 'Mini One',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>📦</Text>
              ),
            }}
          />
          <Tab.Screen
            name="MiniTwo"
            component={MiniTwoScreen}
            options={{
              title: 'Mini Two',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🛰️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f9fafb',
  },
  fallbackText: { color: '#6b7280', fontSize: 15 },
});
