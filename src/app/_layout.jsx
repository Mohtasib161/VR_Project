import "../../global.css";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Configure StatusBar color to match dark Slate background */}
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A', // Premium dark slate header
          },
          headerTintColor: '#F8FAFC', // Slate 50 tint for header text
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
            fontFamily: 'System',
          },
          headerShadowVisible: false, // Cleaner look without border/shadow
          contentStyle: {
            backgroundColor: '#0F172A', // Dark slate background for entire app screen
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home Dashboard',
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: 'User Profile',
            headerBackTitle: 'Home',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
