import { View } from "react-native"

import { Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";
import React from "react";
import { WeatherCodes } from "@/utils/WeatherCodes";
import { Location, WeatherData } from "@/types/weather";

interface Props {
  weatherData: WeatherData;
  selectedLocation: Location;
}

const WeatherSummary:React.FC<Props> = ({ weatherData, selectedLocation }) => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-uk', { day: 'numeric', month: 'long',  });
  return (
    <View style={styles.container}>
      <Text style={styles.locationName}>{selectedLocation?.name}</Text>
      <WeatherIcon
        code={weatherData.current.weather_code}
        size={170}
      />
      <Text style={styles.temperature}>
        {Math.round(weatherData.current.temperature_2m)}°
      </Text>
      <Text style={styles.desc}>
        {WeatherCodes[weatherData.current.weather_code as keyof typeof WeatherCodes].split(":")[0]}
      </Text>
      <Text style={styles.date}>{day}, {date}</Text>
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
    paddingVertical: 20,
  },
  locationName: {
    fontSize: 40,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 5,
    fontFamily: 'Inter-Regular',
  },
  temperature: {
    fontSize: 88,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'Inter-Regular',
  },
  desc: {
    fontSize: 32,
    color: "white",
    fontFamily: 'Inter-Regular',
  },  
  date: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: 'Inter-Regular',
  },
});
