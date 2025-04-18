import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Text,
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherSummary from "@/features/sevenDayWeather/WeatherSummary";
import DailyForecast from "@/features/sevenDayWeather/DailyForecast";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "@/components/loading/Loading";
import ErrorLoading from "@/components/loading/ErrorLoading";
import { router, useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SevenDaysWeather() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <FontAwesome5 name="calendar-alt" size={20} color="white" />
          <Text style={styles.headerTitle}>7 Days</Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable onPress={() => router.back()} style={{ marginLeft: 16 }}>
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const { weatherData, loading, error, refreshWeather } = useWeather();

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
            <WeatherSummary weatherData={weatherData} />

            <View style={styles.detailsContainer}>
              <WeatherDetails
                icon="wind"
                iconColor="#fff"
                text={`Up to ${Math.round(weatherData.daily.wind_speed_10m_max[1])} km/h`}
                size={30}
                subText="Wind"
              />
              <WeatherDetails
                icon="water"
                iconColor="#fff"
                text={`${weatherData.daily.precipitation_probability_mean[1]}% Chance`}
                size={30}
                subText="Precipitation"
              />
            </View>
          </LinearGradient>
          <View style={styles.weatherContainer}>
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
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Inter-Regular",
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
