import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/WeatherIcon";
import React from "react";

const WeatherSummary = ({ weatherData, selectedLocation }: { weatherData: any, selectedLocation: any }  ) => {
  return (
    <>
      <Text style={styles.locationName}>{selectedLocation?.name}</Text>
      <WeatherIcon
        code={weatherData.current.weather_code}
        size={100}
        color="#4A90E2"
      />
      <Text style={styles.temperature}>
        {Math.round(weatherData.current.temperature_2m)}°C
      </Text>
      <Text style={styles.feelsLike}>
        Feels like {Math.round(weatherData.current.apparent_temperature)}°C
      </Text>
    </>
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  locationName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  feelsLike: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});
