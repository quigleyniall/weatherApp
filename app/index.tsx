import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import HourlyForcast from "@/features/today/HourlyForecast";
import WeatherSummary from "@/features/today/WeatherSummary";
import { LinearGradient } from "expo-linear-gradient";

import Loading from "@/components/loading/Loading";
import ErrorLoading from "@/components/loading/ErrorLoading";
import { useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import WeatherDetailsContainer from "@/components/WeatherDetailsContainer";

export default function TodaysWeather() {
  const {
    weatherData,
    selectedLocation,
    myLocation,
    loading,
    error,
    refreshWeather,
  } = useWeather();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.titleContainer}>
          {selectedLocation.name === myLocation?.name && (
            <FontAwesome5 name="map-marker-alt" size={24} color="white" />
          )}
          <Text style={styles.locationName}>{selectedLocation?.name}</Text>
        </View>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, selectedLocation, myLocation]);

  if (loading && !weatherData) {
    return <Loading />;
  }

  if (error) {
    return <ErrorLoading error={error} refreshWeather={refreshWeather} />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshWeather} />
      }
    >
      {weatherData && (
        <View>
          <LinearGradient
            colors={[
              "rgba(17, 180, 255, 1)",
              "rgba(21, 154, 236, 1)",
              "rgba(17, 103, 242, 1)",
            ]}
            style={styles.headerContainer}
          >
            <WeatherSummary
              {...weatherData.current.summary}
            />
            <WeatherDetailsContainer icons={weatherData.current.icons} />
          </LinearGradient>
          <View style={styles.weatherContainer}>
            <HourlyForcast
              forecasts={weatherData.hourly.forecasts}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010C1B",
    padding: 0,
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  weatherContainer: {
    alignItems: "center",
    padding: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 30,
    borderTopWidth: 2,
    borderTopColor: '#5EA0EB',
  },
});
