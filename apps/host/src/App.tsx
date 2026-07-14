import React, { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RemoteErrorBoundary from './RemoteErrorBoundary';

/**
 * Host owns the single NavigationContainer and a bottom-tab navigator.
 * Each tab renders a federated stack navigator loaded at runtime from a remote:
 *   Tab 1 -> mini/MiniApp   (served on :8082)
 *   Tab 2 -> mini2/MiniApp  (served on :8083)
 * Neither remote's code ships in this binary.
 */
const MiniApp = React.lazy(() => import('mini/MiniApp'));
const Mini2App = React.lazy(() => import('mini2/MiniApp'));

export type RootTabParamList = {
  MiniOne: undefined;
  MiniTwo: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

/** Renders a lazily-loaded remote with both loading (Suspense) and failure
 * (error boundary) states handled. */
function RemoteScreen({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <RemoteErrorBoundary label={label}>
      <Suspense
        fallback={
          <View style={styles.fallback}>
            <ActivityIndicator size="large" color="#4f46e5" />
            <Text style={styles.fallbackText}>Loading {label} remote…</Text>
          </View>
        }>
        {children}
      </Suspense>
    </RemoteErrorBoundary>
  );
}

function MiniOneScreen(_: BottomTabScreenProps<RootTabParamList, 'MiniOne'>) {
  return (
    <RemoteScreen label="mini">
      <MiniApp />
    </RemoteScreen>
  );
}

function MiniTwoScreen(_: BottomTabScreenProps<RootTabParamList, 'MiniTwo'>) {
  return (
    <RemoteScreen label="mini2">
      <Mini2App />
    </RemoteScreen>
  );
}

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
