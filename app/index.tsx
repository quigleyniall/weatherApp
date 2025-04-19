import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import HourlyForcast from "@/features/today/HourlyForecast";
import WeatherSummary from "@/features/today/WeatherSummary";
import { LinearGradient } from "expo-linear-gradient";

import Loading from "@/components/loading/Loading";
import ErrorLoading from "@/components/loading/ErrorLoading";
import WeatherDetailsContainer from "@/features/WeatherDetailsContainer";

export default function TodaysWeather() {
  const {
    weatherData,
    loading,
    error,
    refreshWeather,
  } = useWeather();

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
  weatherContainer: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010C1B',
  },
  weatherImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
