import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./WeatherIcon";

const WeatherCard = ({ list, index, date }: { list: any, index: number, date: string }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    let hours = dateObj.getHours();
    return `${hours}:00`;
  };

  return (
    <View key={date} style={styles.forecastItem}>
      <Text style={styles.forecastTemp}>
        {Math.round(list.temperature_2m[index])}°
      </Text>
      <WeatherIcon code={list.weather_code[index]} size={40} color="#4A90E2" />

      <Text style={styles.forecastTime}>{formatDate(date)}</Text>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  forecastItem: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "transparent",
    borderWidth: .4,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 32,
    width: 80,
  },
 
  forecastTemp: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 3,
  },
  forecastTime: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 5,
  },
});
