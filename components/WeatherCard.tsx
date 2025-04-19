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
      <View style={styles.tempContainer}>
        <Text style={styles.temp}>{temperature}</Text>
        <Text style={styles.tempUnit}>°</Text>
      </View>
      <WeatherIcon code={weatherCode} size={48} />
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
    borderWidth: 0.1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 32,
    width: 80,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "relative",
  },
  tempUnit: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 3,
    fontFamily: "Inter-Regular",
    position: "absolute",
    top: 3,
    right: -10,
  },
  temp: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 3,
    fontFamily: "Inter-Regular",
  },
  time: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
});
