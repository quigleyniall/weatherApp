import { View } from "react-native";

import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";
import React from "react";
import { WeatherTomorrow } from "@/types/weather";

const WeatherSummary: React.FC<WeatherTomorrow> = ({
  temperatureMax,
  temperatureMin,
  weatherCode,
  weatherDescription,
  title,
}) => (
  <View style={styles.container}>
    <View style={styles.weatherIconContainer}>
      <WeatherIcon code={weatherCode} size={100} />
    </View>
    <View style={styles.temperatureInfo}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.temperatureWrapper}>
        <Text style={styles.temperatureMax}>{temperatureMax}</Text>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureDivider}>/</Text>
          <Text style={styles.temperatureMin}>{temperatureMin}</Text>
          <Text style={styles.temperatureUnit}>°</Text>
        </View>
      </View>
      <Text style={styles.desc}>{weatherDescription}</Text>
    </View>
  </View>
);

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
  temperatureWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 8
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  temperatureMax: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Regular",
    marginBottom: -10,
  },
  temperatureDivider: {
    fontSize: 48,
    color: "#ccc",
    fontWeight: "300",
    fontFamily: "Inter-Regular",
    alignSelf: "flex-start",
    marginRight: 6
  },
  temperatureMin: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
  temperatureUnit: {
    fontSize: 30,
    color: "#ccc",
    fontWeight: "300",
    fontFamily: "Inter-Regular",
    alignSelf: "flex-start",
    marginTop: 10
  },
  desc: {
    fontSize: 18,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
