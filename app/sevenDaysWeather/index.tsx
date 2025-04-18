import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Text
} from "react-native";
import { useWeather } from "@/context/WeatherContext";
import { WeatherCodes } from "@/utils/WeatherCodes";
import WeatherDetailContainer from "@/features/WeatherDetailContainer";
import WeatherSummary from "@/features/sevenDayWeather/WeatherSummary";
import DailyForecast from "@/features/sevenDayWeather/DailyForecast";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "@/components/loading/Loading";
import ErrorLoading from "@/components/loading/ErrorLoading";
import { router, useNavigation } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SevenDaysWeather() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome5 name="calendar-alt" size={22} color="white" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>7 Day Forecast</Text>
        </View>
      ),
      headerLeft: () => (
      <Pressable onPress={() => router.back()} style={{ paddingLeft: 10 }}>
        <FontAwesome5 name="arrow-left" size={24} color="white" />
      </Pressable>
    ), });
  }, [navigation]);

  const { weatherData, selectedLocation, myLocation, loading, error, refreshWeather } =
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
              myLocation={myLocation}
            />

            <WeatherDetailContainer weatherData={weatherData} />
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
});
