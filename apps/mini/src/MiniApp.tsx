import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MiniButton from './MiniButton';

/**
 * This whole stack navigator is EXPOSED over Module Federation as
 * `mini/MiniApp`. The host renders it inside one of its bottom tabs. Because
 * @react-navigation/native is a shared singleton, this nested stack attaches to
 * the host's single NavigationContainer.
 */
type MiniStackParamList = {
  MiniHome: undefined;
  MiniDetails: undefined;
};

const Stack = createNativeStackNavigator<MiniStackParamList>();

function MiniHome({ navigation }: NativeStackScreenProps<MiniStackParamList, 'MiniHome'>) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.badge}>📦 mini remote · own stack</Text>
      <MiniButton />
      <View style={styles.spacer} />
      <Button title="Go to Details →" onPress={() => navigation.navigate('MiniDetails')} />
    </ScrollView>
  );
}

function MiniDetails({ navigation }: NativeStackScreenProps<MiniStackParamList, 'MiniDetails'>) {
  return (
    <View style={[styles.screen, styles.center]}>
      <Text style={styles.title}>Mini · Details</Text>
      <Text style={styles.body}>
        This is a second screen pushed onto the mini remote's own stack — proving
        the remote controls its own navigation inside the host tab.
      </Text>
      <Button title="← Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function MiniApp() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#eef2ff' },
        headerTintColor: '#1e1b4b',
      }}>
      <Stack.Screen name="MiniHome" component={MiniHome} options={{ title: 'Mini' }} />
      <Stack.Screen name="MiniDetails" component={MiniDetails} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, padding: 20, gap: 16 },
  center: { justifyContent: 'center', alignItems: 'center' },
  badge: { fontSize: 12, color: '#4338ca', fontWeight: '600', textAlign: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#1e1b4b' },
  body: { fontSize: 15, color: '#4b5563', lineHeight: 22, textAlign: 'center' },
  spacer: { height: 8 },
});
