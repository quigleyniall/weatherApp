import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./icons/WeatherIcon";
import { WeatherCodes } from "@/utils/WeatherCodes";
import { WeatherData } from "@/types/weather";

const WeatherListItem = ({ weatherData, index, date }: { weatherData: WeatherData, index: number, date: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.forecastDay}>
        {new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </Text>

      <View style={styles.forecastContainer}>
        <WeatherIcon
          code={weatherData.daily.weather_code[index]}
          size={30}
          color="#4A90E2"
        />
        <Text style={styles.forcast}>
          {WeatherCodes[weatherData.daily.weather_code[index] as keyof typeof WeatherCodes].split(":")[0]}
        </Text>
      </View>
      <View style={styles.forecastTempContainer}>
        <Text style={styles.forecastTempMax}>
          {Math.round(weatherData.daily.temperature_2m_max[index])}°
        </Text>
        <Text style={styles.forecastTempMin}>
          {Math.round(weatherData.daily.temperature_2m_min[index])}°
        </Text>
      </View>
    </View>
  );
};

export default WeatherListItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 10,
    flexDirection: "row",
    color: "#fff",
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
  forecastDay: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 5,
    flexBasis: "30%",
    fontFamily: 'Inter-Regular',
  },
  forecastContainer: {
    display: "flex",
    flexDirection: "row",
    flexBasis: "30%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  forecastTempMin: { 
    fontSize: 18, 
    color: "#ccc", 
    marginLeft: 5,
    fontFamily: 'Inter-Regular',
  },
  forecastTempMax: { 
    fontSize: 18, 
    color: "#fff", 
    fontWeight: "700",
    fontFamily: 'Inter-Regular',
  },
  forcast: { 
    fontSize: 18, 
    color: "#ccc", 
    marginLeft: 10,
    fontFamily: 'Inter-Regular',
  },
  forecastTempContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
});
