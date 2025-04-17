import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const WeatherDetails = ({ icon, iconColor, text, size, subText }: { icon: string, iconColor: string, text: string, size: number, subText: string }) => (
    <View style={styles.detailItem}>
        <Icon name={icon} size={size} color={iconColor} />
        <Text style={styles.detailText}>
        {text}
        </Text>
        <Text style={styles.subText}>{subText}</Text>
    </View>
);
export default WeatherDetails;

const styles = StyleSheet.create({
    detailItem: {
      alignItems: "center",
    },
    subText: {
      marginTop: 5,
      fontSize: 14,
      color: "#ccc",
    },
    detailText: {
      marginTop: 5,
      fontSize: 20,
      color: "#fff",
    },
  });
  
