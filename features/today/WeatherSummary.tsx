import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "@/components/icons/WeatherIcon";

interface WeatherSummaryProps {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
  formattedDate: string;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({
  temperature,
  weatherCode,
  weatherDescription,
  formattedDate,
}) => {
  return (
    <View style={styles.container}>
      <WeatherIcon code={weatherCode} size={200} />
      <Text style={styles.temperature}>{temperature}°</Text>
      <Text style={styles.desc}>{weatherDescription}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
    
  );
};

export default WeatherSummary;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  temperature: {
    fontSize: 88,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter-Regular",
  },
  desc: {
    fontSize: 32,
    color: "white",
    fontFamily: "Inter-Regular",
  },
  date: {
    fontSize: 16,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
