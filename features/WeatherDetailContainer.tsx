import { View, StyleSheet } from "react-native";
import WeatherDetails from "@/components/WeatherDetails";
import React from "react";
import { WeatherData } from "@/types/weather";

interface Props {
  weatherData: WeatherData;
}

const WeatherDetailContainer:React.FC<Props> = ({ weatherData }) => {
  const list = [
    {
      icon: "tint",
      iconColor: "#fff",
      text: `${weatherData.current.relative_humidity_2m}%`,
      size: 40,
      subText: "Humidity",
    },
    {
      icon: "wind",
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: '#5EA0EB',
  },
});
