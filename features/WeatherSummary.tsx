import { View } from "react-native"

import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/WeatherIcon";
import React from "react";
import { WeatherCodes } from "@/utils/WeatherCodes";

const WeatherSummary = ({ weatherData, selectedLocation }: { weatherData: any, selectedLocation: any }  ) => {
  return (
    <View style={styles.weatherSummaryContainer}>
      <Text style={styles.locationName}>{selectedLocation?.name}</Text>
      <WeatherIcon
        code={weatherData.current.weather_code}
        size={180}
        color="#fff"
      />
      <Text style={styles.temperature}>
        {Math.round(weatherData.current.temperature_2m)}°
      </Text>
      <Text style={styles.weatherDescription}>{WeatherCodes[weatherData.current.weather_code].split(":")[0]}</Text>
      
    </View>
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  weatherSummaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  locationName: {
    fontSize: 40,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 88,
    fontWeight: "bold",
    color: "white",
  },
  weatherDescription: {
    fontSize: 32,
    color: "white",
  },
});
