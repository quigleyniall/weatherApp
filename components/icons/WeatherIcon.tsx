import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface WeatherIconProps {
  code: number;
  size?: number;
  color?: string;
}

const getWeatherIcon = (code: number): string => {
  // Weather codes based on Open-Meteo API documentation
  switch (code) {
    case 0:
      return 'weather-sunny'; // Clear sky
    case 1:
    case 2:
    case 3:
      return 'weather-partly-cloudy'; // Partly cloudy
    case 45:
    case 48:
      return 'weather-fog'; // Foggy
    case 51:
    case 53:
    case 55:
      return 'weather-rainy'; // Drizzle
    case 61:
    case 63:
    case 65:
      return 'weather-pouring'; // Rain
    case 71:
    case 73:
    case 75:
      return 'weather-snowy'; // Snow
    case 77:
      return 'weather-snowy-heavy'; // Snow grains
    case 80:
    case 81:
    case 82:
      return 'weather-rainy'; // Rain showers
    case 85:
    case 86:
      return 'weather-snowy-heavy'; // Snow showers
    case 95:
      return 'weather-lightning-rainy'; // Thunderstorm
    case 96:
    case 99:
      return 'weather-lightning'; // Thunderstorm with hail
    default:
      return 'weather-sunny';
  }
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  size = 50,
  color = '#000',
}) => {
  return (
    <View style={styles.container}>
      <Icon name={getWeatherIcon(code)} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 