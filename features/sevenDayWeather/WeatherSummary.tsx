import { View } from "react-native";

import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";
import React from "react";
import { WeatherCodes } from "@/utils/WeatherCodes";
import { WeatherData } from "@/types/weather";
interface Props {
  weatherData: WeatherData;
}

const WeatherSummary: React.FC<Props> = ({
  weatherData,
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.weatherIconContainer}>
      <WeatherIcon code={weatherData.daily.weather_code[1]} size={100} />
      </View>
      <View style={styles.temperatureInfo}>
        <Text style={styles.title}>Tomorrow</Text>

        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureMax}>
            {Math.round(weatherData.daily.temperature_2m_max[1])}°
          </Text>
          <Text style={styles.temperatureMin}>
            /{Math.round(weatherData.daily.temperature_2m_min[1])}°
          </Text>
        </View>
        <Text style={styles.desc}>
          {
            WeatherCodes[
              weatherData.daily.weather_code[1] as keyof typeof WeatherCodes
            ].split(":")[0]
          }
        </Text>
      </View>
    </View>
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  temperatureInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexBasis: "60%",
  },
  weatherIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "40%",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  temperatureMax: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Regular",
  },
  temperatureMin: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
  desc: {
    fontSize: 18,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
