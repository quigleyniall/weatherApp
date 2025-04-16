import { StyleSheet, Platform, View, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import useWeather from "@/hooks/useWeather";

export default function HomeScreen() {
  const { weather, loading, error } = useWeather();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <View>
        <Text>{JSON.stringify(weather, null, 2)}</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
