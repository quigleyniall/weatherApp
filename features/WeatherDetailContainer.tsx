import { View, StyleSheet } from "react-native";
import WeatherDetails from "@/components/WeatherDetails";
import React from "react";

const WeatherDetailContainer = ({ weatherData }) => {
  const list = [
    {
      icon: "water-percent",
      iconColor: "#4A90E2",
      text: `${weatherData.current.relative_humidity_2m}%`,
    },
    {
      icon: "weather-windy",
      iconColor: "#4A90E2",
      text: `${Math.round(weatherData.current.wind_speed_10m)} km/h`,
    },
    {
      icon: "water",
      iconColor: "#4A90E2",
      text: `${weatherData.current.precipitation} mm`,
    },
  ];

  return (
    <View style={styles.detailsContainer}>
      {list.map((item) => (
        <WeatherDetails
          icon={item.icon}
          iconColor={item.iconColor}
              text={item.text}
        />
      ))}
    </View>
  );
};

export default WeatherDetailContainer;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
});
