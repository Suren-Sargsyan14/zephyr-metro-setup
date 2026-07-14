import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';

/**
 * Exposed over Module Federation as `mini2/MiniApp`. A second, independent
 * remote with its own stack navigator, rendered inside the host's second tab.
 */
type Mini2StackParamList = {
  Mini2Home: undefined;
  Mini2Settings: undefined;
};

const Stack = createNativeStackNavigator<Mini2StackParamList>();

function Mini2Home({ navigation }: NativeStackScreenProps<Mini2StackParamList, 'Mini2Home'>) {
  const [likes, setLikes] = useState(0);
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.badge}>🛰️ mini2 remote · own stack</Text>
        <Text style={styles.title}>Hello from Mini Two!</Text>
        <TouchableOpacity style={styles.button} onPress={() => setLikes(n => n + 1)} activeOpacity={0.8}>
          <Text style={styles.buttonText}>❤️ {likes} likes</Text>
        </TouchableOpacity>
      </View>
      <Button title="Open Settings →" color="#047857" onPress={() => navigation.navigate('Mini2Settings')} />
    </ScrollView>
  );
}

function Mini2Settings(_: NativeStackScreenProps<Mini2StackParamList, 'Mini2Settings'>) {
  const [on, setOn] = useState(true);
  return (
    <View style={[styles.screen, styles.center]}>
      <Text style={styles.title}>Mini2 · Settings</Text>
      <View style={styles.row}>
        <Text style={styles.body}>Enable notifications</Text>
        <Switch value={on} onValueChange={setOn} trackColor={{ true: '#10b981' }} />
      </View>
      <Text style={styles.body}>A second screen in mini2's own stack.</Text>
    </View>
  );
}

export default function MiniApp() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ecfdf5' },
        headerTintColor: '#064e3b',
      }}>
      <Stack.Screen name="Mini2Home" component={Mini2Home} options={{ title: 'Mini Two' }} />
      <Stack.Screen name="Mini2Settings" component={Mini2Settings} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, padding: 20, gap: 16 },
  center: { justifyContent: 'center', alignItems: 'center', gap: 16 },
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
  title: { fontSize: 20, fontWeight: '800', color: '#064e3b' },
  body: { fontSize: 15, color: '#374151', lineHeight: 22 },
  button: { backgroundColor: '#059669', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
