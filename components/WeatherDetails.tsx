import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  icon: string;
  iconColor: string;
  text: string;
  size: number;
  subText: string;
}

const WeatherDetails: React.FC<Props> = ({
  icon,
  iconColor,
  text,
  size,
  subText,
}) => (
  <View style={styles.item}>
    <FontAwesome5 name={icon} size={size} color={iconColor} />
    <Text style={styles.text}>{text}</Text>
    <Text style={styles.subText}>{subText}</Text>
  </View>
);
export default WeatherDetails;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  subText: {
    marginTop: 5,
    fontSize: 14,
    color: "#ccc",
    fontFamily: "Inter-Regular",
  },
});
