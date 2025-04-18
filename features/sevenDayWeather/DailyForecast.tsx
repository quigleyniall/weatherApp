import WeatherListItem from "@/components/WeatherListItem";
import { View, StyleSheet } from "react-native";
import { DailyForecast as DailyForecastType } from "@/types/weather";

const DailyForecast: React.FC<{ forecasts: DailyForecastType[] }> = ({
  forecasts,
}) => (
  <View style={styles.weatherContainer}>
    {forecasts.map((forecast, index) => (
      <WeatherListItem key={index} {...forecast} />
    ))}
  </View>
);

export default DailyForecast;

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    padding: 20,
  },
});
