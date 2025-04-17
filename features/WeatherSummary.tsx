import { View } from "react-native"

import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";
import React from "react";
import { WeatherCodes } from "@/utils/WeatherCodes";
import { WeatherData } from "@/types/weather";

const WeatherSummary = ({ weatherData, selectedLocation }: { weatherData: WeatherData, selectedLocation: any }  ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.locationName}>{selectedLocation?.name}</Text>
      <WeatherIcon
        code={weatherData.current.weather_code}
        size={180}
        color="#fff"
      />
      <Text style={styles.temperature}>
        {Math.round(weatherData.current.temperature_2m)}°
      </Text>
      <Text style={styles.desc}>
        {WeatherCodes[weatherData.current.weather_code as keyof typeof WeatherCodes].split(":")[0]}
      </Text>
    </View>
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Inter-Regular',
  },
  temperature: {
    fontSize: 88,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'Inter-Regular',
    letterSpacing: 6,
  },
  desc: {
    fontSize: 32,
    color: "white",
    fontFamily: 'Inter-Regular',
  },
});
