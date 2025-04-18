import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Location } from "@/types/weather";
import { FontAwesome5 } from "@expo/vector-icons";

const LocationLink = ({
  location,
  selectedLocation,
  handleLocationPress,
  currentLocation,
}: {
  location: Location;
  selectedLocation: Location;
  handleLocationPress: (location: Location) => void;
  currentLocation?: boolean;
}) => (
  <TouchableOpacity
    style={[
      styles.locationItem,
      selectedLocation.name === location.name && styles.selectedLocation,
    ]}
    onPress={() => handleLocationPress(location)}
  >
    <View style={styles.linkItem}>
      <Text style={styles.locationText}>{location.name}</Text>
      {currentLocation && (
        <FontAwesome5 name="map-marker-alt" size={16} color="white" />
      )}
    </View>
  </TouchableOpacity>
);

export default LocationLink;

const styles = StyleSheet.create({
  locationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedLocation: {
    backgroundColor: "#1168F1",
  },
  locationText: {
    fontSize: 16,
    color: "white",
  },
});
