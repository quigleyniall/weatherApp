import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";
import { WeatherCurrent } from "@/types/weather";

const WeatherSummary: React.FC<WeatherCurrent> = ({
  temperature,
  weatherCode,
  weatherDescription,
  formattedDate,
}) => {
  return (
    <View style={styles.container}>
      <WeatherIcon code={weatherCode} size={200} />
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{temperature}</Text>
        <Text style={styles.temperatureUnit}>°</Text>
      </View>
      <Text style={styles.desc}>{weatherDescription}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "relative",
  },
  temperature: {
    fontSize: 120,
    fontWeight: "700",
    color: "white",
    fontFamily: "Inter-Regular",
    marginBottom: -20,
    marginTop: -20,
  },
  temperatureUnit: {
    fontSize: 40,
    color: "white",
    fontWeight: "300",
    fontFamily: "Inter-Regular",
    alignSelf: "flex-start",
    position: "absolute",
    top: 10,
    right: -20,
  },
  desc: {
    fontSize: 32,
    color: "white",
    fontWeight: "300",
    fontFamily: "Inter-Regular",
  },
  date: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
