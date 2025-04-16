import React, { useState } from 'react';
import { StyleSheet, Platform, View, Text, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { useWeather } from '@/context/WeatherContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { WeatherIcon } from '../components/WeatherIcon';

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
      style={{$$css: true, _: 'bg-grey-100'}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshWeather} />
      }
    >

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.locationName}>{selectedLocation.name}</Text>
          <WeatherIcon
            code={weatherData.current.weather_code}
            size={100}
            color="#4A90E2"
          />
          <Text style={styles.temperature}>
            {Math.round(weatherData.current.temperature_2m)}°C
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {Math.round(weatherData.current.apparent_temperature)}°C
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="water-percent" size={24} color="#4A90E2" />
              <Text style={styles.detailText}>
                {weatherData.current.relative_humidity_2m}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="weather-windy" size={24} color="#4A90E2" />
              <Text style={styles.detailText}>
                {Math.round(weatherData.current.wind_speed_10m)} km/h
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="water" size={24} color="#4A90E2" />
              <Text style={styles.detailText}>
                {weatherData.current.precipitation} mm
              </Text>
            </View>
          </View>

          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>7-Day Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {weatherData.daily.time.map((date, index) => (
                <View key={date} style={styles.forecastItem}>
                  <Text style={styles.forecastDay}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <WeatherIcon
                    code={weatherData.daily.weather_code[index]}
                    size={40}
                    color="#4A90E2"
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(weatherData.daily.temperature_2m_max[index])}°
                  </Text>
                  <Text style={styles.forecastTempMin}>
                    {Math.round(weatherData.daily.temperature_2m_min[index])}°
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  locationSelector: {
    padding: 10,
    backgroundColor: 'white',
  },
  locationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
  },
  selectedLocation: {
    backgroundColor: '#4A90E2',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLocationText: {
    color: 'white',
  },
  weatherContainer: {
    alignItems: 'center',
    padding: 20,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  feelsLike: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  forecastContainer: {
    width: '100%',
    marginTop: 20,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  forecastDay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastTempMin: {
    fontSize: 14,
    color: '#666',
  },
}); 