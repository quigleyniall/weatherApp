import { DefaultTheme, ThemeProvider, DrawerActions } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { WeatherProvider, useWeather } from "@/context/WeatherContext";
import { DrawerContent } from "@/components/drawer/DrawerContent";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function HeaderTitle() {
  const { selectedLocation, myLocation } = useWeather();

  return (
    <View style={styles.titleContainer}>
      {selectedLocation.name === myLocation?.name && (
        <FontAwesome5 name="map-marker-alt" size={24} color="white" />
      )}
      <Text style={styles.locationName}>{selectedLocation?.name}</Text>
    </View>
  );
}

function SevenDaysHeaderTitle() {
  return (
    <View style={styles.titleContainer}>
      <FontAwesome5 name="calendar-alt" size={20} color="white" />
      <Text style={styles.locationName}>7 Days</Text>
    </View>
  );
}

export default function RootLayout() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                borderBottomWidth: 0,
              },
              headerTintColor: "#fff",
              headerShadowVisible: false,
              drawerStyle: {
                backgroundColor: "rgb(13, 149, 212)",
              },
              headerTitleStyle: {
                fontFamily: "Inter-Regular",
              },
              headerTitleAlign: "center",
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                headerTitle: () => <HeaderTitle />,
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    style={{ marginLeft: 15 }}
                  >
                    <Ionicons name="menu-outline" size={28} color="#fff" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Drawer.Screen
              name="sevenDaysWeather/index"
              options={{
                headerTitle: () => <SevenDaysHeaderTitle />,
                headerLeft: () => (
                  <Pressable
                    onPress={() => router.back()}
                    style={{ marginLeft: 16 }}
                  >
                    <FontAwesome5 name="arrow-left" size={24} color="white" />
                  </Pressable>
                ),
              }}
            />
          </Drawer>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </WeatherProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
});
