import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import { WeatherCodes } from "@/utils/WeatherCodes";
import HourlyForcast from "@/features/HourlyForecast";
import WeatherDetailContainer from "@/features/WeatherDetailContainer";
import WeatherSummary from "@/features/WeatherSummary";
import DailyForecast from "@/features/DailyForecast";

export default function HomeScreen() {
  const {
    weatherData,
    selectedLocation,
    locations,
    loading,
    error,
    setSelectedLocation,
    refreshWeather,
  } = useWeather();

  if (loading && !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshWeather}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshWeather} />
      }
    >
      {weatherData && (
        <View style={styles.weatherContainer}>
          <WeatherSummary
            weatherData={weatherData}
            selectedLocation={selectedLocation}
          />
          <WeatherDetailContainer weatherData={weatherData} />
          <HourlyForcast
            list={weatherData.hourly}
            title={WeatherCodes[weatherData.current.weather_code]}
          />
          <DailyForecast weatherData={weatherData} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1197F9',
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
  },
  locationSelector: {
    padding: 10,
    backgroundColor: "white",
  },
  locationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
  },
  selectedLocation: {
    backgroundColor: "#4A90E2",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
  selectedLocationText: {
    color: "white",
  },
  weatherContainer: {
    alignItems: "center",
    padding: 20,
  },
  locationName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  feelsLike: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  detailItem: {
    alignItems: "center",
  },
  detailText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
});
