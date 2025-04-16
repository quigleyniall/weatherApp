import { StyleSheet, Platform, View, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import useWeather from "@/hooks/useWeather";
import WeatherIcon from "@/utils/WeatherIcons";
import CustomList from "@/components/List";
export default function HomeScreen() {
  const { weather, loading, error } = useWeather();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <View>
        <Text>
          {weather?.current.temperature_2m}{" "}
          {weather?.hourly_units.temperature_2m}
        </Text>
        <WeatherIcon code={weather?.current.weather_code} />
      </View>
      <CustomList items={weather?.dailyForecast ?? []} />

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
