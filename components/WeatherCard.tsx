import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./icons/WeatherIcon";

interface Props {
  temperature: number;
  weatherCode: number;
  formattedTime: string;
}

const WeatherCard: React.FC<Props> = ({
  temperature,
  weatherCode,
  formattedTime,
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.temp}>{temperature}°</Text>
      <WeatherIcon code={weatherCode} size={32} />

      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "transparent",
    borderWidth: .1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 32,
    width: 80,
  },

  temp: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 3,
    fontFamily: "Inter-Regular",
  },
  time: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
});
