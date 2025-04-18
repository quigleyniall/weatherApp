import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { WeatherProvider } from "@/context/WeatherContext";
import { DrawerContent } from "@/components/drawer/DrawerContent";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <WeatherProvider>
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
              headerStyle: {
                backgroundColor: "rgba(17, 180, 255, 1)", 
                borderBottomWidth: 0
              },
              headerTintColor: "#fff",
              headerShadowVisible: false, 
              drawerStyle: {
                backgroundColor: "rgb(13, 149, 212)",
              },
              headerTitleStyle: {
                fontFamily: 'Inter-Regular',
              },
            }}
          >
            <Drawer.Screen
              name="index"
            />
            <Drawer.Screen
              name="sevenDaysWeather"
            />
          </Drawer>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </WeatherProvider>
    </ThemeProvider>
  );
}
