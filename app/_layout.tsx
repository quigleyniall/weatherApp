import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { WeatherProvider } from '@/context/WeatherContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  return (
    <ThemeProvider value={DefaultTheme}>
      <WeatherProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Home',
              title: 'overview',
            }}
          />
             <Drawer.Screen
            name="weather/[location]" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Tokyo',
              title: 'Tokyo',
            }}
          />
        
        </Drawer>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
      </WeatherProvider>
    </ThemeProvider>
  );
}
