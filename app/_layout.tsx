import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { WeatherProvider } from '@/context/WeatherContext';
import { DrawerContent } from '@/components/DrawerContent';
import './global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <WeatherProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Home',
                title: 'Overview',
              }}
            />
          </Drawer>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </WeatherProvider>
    </ThemeProvider>
  );
}
