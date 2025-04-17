import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./WeatherIcon";

const WeatherListItem = ({ weatherData, index, date }) => {
    return (
        <View style={styles.forecastItem}>
                  <Text style={styles.forecastDay}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </Text>
                  <WeatherIcon
                    code={weatherData.daily.weather_code[index]}
                    size={40}
                    color="#4A90E2"
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(weatherData.daily.temperature_2m_max[index])}°
                  </Text>
                  <Text style={styles.forecastTempMin}>
                    {Math.round(weatherData.daily.temperature_2m_min[index])}°
                  </Text>
                </View>
    )
}

export default WeatherListItem;



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
  