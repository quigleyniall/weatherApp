import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useWeather } from "@/context/WeatherContext";
import { router } from "expo-router";
import LocationLink from "./LocationLink";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { locations, selectedLocation, setSelectedLocation, myLocation } =
    useWeather();

  const handleLocationPress = (location: (typeof locations)[0]) => {
    setSelectedLocation(location);
    router.push("/");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={[styles.headerText]}>Locations</Text>
        <ScrollView style={styles.locationsList}>
          {myLocation && (
            <LocationLink
              currentLocation={true}
              location={myLocation}
              selectedLocation={selectedLocation}
              handleLocationPress={handleLocationPress}
            />
          )}
          {locations.map((location) => (
            <LocationLink
              key={location.name}
              location={location}
              selectedLocation={selectedLocation}
              handleLocationPress={handleLocationPress}
            />
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
