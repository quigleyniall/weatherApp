import { View, StyleSheet } from "react-native";
import WeatherDetails from "@/components/WeatherDetails";
import React from "react";

const WeatherDetailContainer = ({ weatherData }: { weatherData: any }) => {
  const list = [
    {
      icon: "water-percent",
      iconColor: "#fff",
      text: `${weatherData.current.relative_humidity_2m}%`,
      size: 40,
      subText: "Humidity",
    },
    {
      icon: "weather-windy",
      iconColor: "#fff",
      text: `${Math.round(weatherData.current.wind_speed_10m)} km/h`,
      size: 40,
      subText: "Wind",
    },
    {
      icon: "water",
      iconColor: "#fff",
      text: `${weatherData.current.precipitation} mm`,
      size: 40,
      subText: "Precipitation",
    },
  ];

  return (
    <View style={styles.detailsContainer}>
      {list.map(({...item}, index) => (
        <WeatherDetails
        key={index}
        {...item}
        />
      ))}
    </View>
  );
};

export default WeatherDetailContainer;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 40,
    borderTopWidth: 2,
    borderTopColor: '#5EA0EB',
  },
});
