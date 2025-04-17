import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import { WeatherCodes } from "@/utils/WeatherCodes";
import HourlyForcast from "@/features/HourlyForecast";
import WeatherDetailContainer from "@/features/WeatherDetailContainer";
import WeatherSummary from "@/features/WeatherSummary";
import DailyForecast from "@/features/DailyForecast";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "@/components/loading/Loading";
import ErrorLoading from "@/components/loading/ErrorLoading";

export default function HomeScreen() {
  const { weatherData, selectedLocation, loading, error, refreshWeather } =
    useWeather();

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
              weatherData={weatherData}
              selectedLocation={selectedLocation}
            />

            <WeatherDetailContainer weatherData={weatherData} />
          </LinearGradient>
          <View style={styles.weatherContainer}>
            <HourlyForcast
              list={weatherData.hourly}
              title={WeatherCodes[weatherData.current.weather_code].split(":")[0]}
            />
            <DailyForecast weatherData={weatherData} />
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
  weatherContainer: {
    alignItems: "center",
    padding: 20,
  },
});
