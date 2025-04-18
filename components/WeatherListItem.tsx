import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./icons/WeatherIcon";
import { DailyForecast } from "@/types/weather";


const WeatherListItem:React.FC<DailyForecast> = ({ 
  temperatureMax, 
  temperatureMin, 
  weatherCode, 
  weatherDescription,
  formattedDay 
  }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.day}>{formattedDay}</Text>
      <View style={styles.weatherContainer}>
        <WeatherIcon code={weatherCode} size={32} />
        <Text style={styles.weatherDescription}>{weatherDescription}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.tempMax}>{temperatureMax}°</Text>
        <Text style={styles.tempMin}>{temperatureMin}°</Text>
      </View>
    </View>
  );
};

export default WeatherListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    width: "100%",
  },
  day: {
    flexBasis: '30%',
    fontSize: 16,
    color: "#ccc",
    width: 50,
    fontFamily: "Inter-Regular",
  },
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  weatherDescription: {
    fontSize: 16,
    color: "#ccc",
    marginLeft: 10,
    fontFamily: "Inter-Regular",
  },
  tempContainer: {
    flexDirection: "row",
    width: 80,
    justifyContent: "flex-end",
  },
  tempMax: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    marginRight: 10,
    fontFamily: "Inter-Regular",
  },
  tempMin: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
