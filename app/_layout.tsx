import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { WeatherProvider } from "@/context/WeatherContext";
import { DrawerContent } from "@/components/DrawerContent";
import "../styling/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <WeatherProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent", 
              },
              headerShadowVisible: false, 
              drawerStyle: {
                backgroundColor: "#0654A3",
              },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Home",
                title: "",
              }}
            />
          </Drawer>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </WeatherProvider>
    </ThemeProvider>
  );
}
