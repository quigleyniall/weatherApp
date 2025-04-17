import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./WeatherIcon";

const WeatherCard = ({ list, index, date }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    let hours = dateObj.getHours();
    let formattedHours = hours % 12 || 12;
    let ampm = hours >= 12 ? "PM" : "AM";
    return `${formattedHours} ${ampm}`;
  };

  return (
    <View key={date} style={styles.forecastItem}>
      <Text style={styles.forecastDay}>{formatDate(date)}</Text>
      <WeatherIcon code={list.weather_code[index]} size={40} color="#4A90E2" />
      <Text style={styles.forecastTemp}>
        {Math.round(list.temperature_2m[index])}°
      </Text>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  forecastItem: {
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  forecastDay: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
