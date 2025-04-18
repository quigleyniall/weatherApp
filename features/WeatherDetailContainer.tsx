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
      icon: "wind",
      iconColor: "#fff",
      text: `${Math.round(weatherData.current.wind_speed_10m)} km/h`,
      size: 30,
      subText: "Wind",
    },
    {
      icon: "tint",
      iconColor: "#fff",
      text: `${weatherData.current.relative_humidity_2m}%`,
      size: 30,
      subText: "Humidity",
    },
    
    {
      icon: "water",
      iconColor: "#fff",
      text: `${weatherData.current.precipitation} mm`,
      size: 30,
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
    marginHorizontal: 30,
    borderTopWidth: 2,
    borderTopColor: '#5EA0EB',
  },
});
