import { View, Text, StyleSheet } from "react-native";
import { WeatherIcon } from "./WeatherIcon";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const WeatherDetails = ({ icon, iconColor, text }: { icon: string, iconColor: string, text: string }) => (
    <View style={styles.detailItem}>
        <Icon name={icon} size={24} color={iconColor} />
        <Text style={styles.detailText}>
        {text}
        </Text>
    </View>
);
export default WeatherDetails;

const styles = StyleSheet.create({
    detailItem: {
      alignItems: "center",
    },
    detailText: {
      marginTop: 5,
      fontSize: 14,
      color: "#666",
    },
  });
  
