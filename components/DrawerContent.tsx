import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useWeather } from "@/context/WeatherContext";
import { router } from "expo-router";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { locations, selectedLocation, setSelectedLocation } = useWeather();

  const handleLocationPress = (location: (typeof locations)[0]) => {
    setSelectedLocation(location);
    router.push("/");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={[styles.headerText]}>Locations</Text>
        <ScrollView style={styles.locationsList}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.name}
              style={[
                styles.locationItem,
                selectedLocation.name === location.name &&
                  styles.selectedLocation,
              ]}
              onPress={() => handleLocationPress(location)}
            >
              <Text
                style={[
                  styles.locationText,
                  selectedLocation.name === location.name &&
                    styles.selectedLocationText,
                ]}
              >
                {location.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  locationsList: {
    marginTop: 10,
  },
  locationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  selectedLocation: {
    backgroundColor: "#4A90E2",
  },
  locationText: {
    fontSize: 16,
    color: "white",
  },
  selectedLocationText: {
    color: "white",
  },
});
