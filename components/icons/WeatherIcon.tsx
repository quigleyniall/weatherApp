import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface WeatherIconProps {
  code: number;
  size?: number;
  color?: string;
}

const getWeatherIcon = (code: number): string => {
  // Weather codes based on Open-Meteo API documentation
  switch (code) {
    case 0:
      return 'sun'; // Clear sky
    case 1:
    case 2:
    case 3:
      return 'cloud'; // Partly cloudy
    case 45:
    case 48:
      return 'smog'; // Foggy
    case 51:
    case 53:
    case 55:
      return 'cloud-rain'; // Drizzle
    case 61:
    case 63:
    case 65:
      return 'cloud-rain'; // Rain
    case 71:
    case 73:
    case 75:
      return 'snowflake'; // Snow
    case 77:
      return 'snowflake'; // Snow grains
    case 80:
    case 81:
    case 82:
      return 'cloud-rain'; // Rain showers
    case 85:
    case 86:
      return 'snowflake'; // Snow showers
    case 95:
      return 'bolt'; // Thunderstorm
    case 96:
    case 99:
      return 'bolt'; // Thunderstorm with hail
    default:
      return 'sun';
  }
};

const getWeatherColor = (code: number): string => {
  // Color scheme based on weather condition
  switch (code) {
    case 0:
      return '#FEF008'; // Sunny - bright yellow
    case 1:
    case 2:
    case 3:
      return '#eee'; // Partly cloudy - light blue-gray
    case 45:
    case 48:
      return '#ddd'; // Foggy - darker blue-gray
    case 51:
    case 53:
    case 55:
      return '#4FC3F7'; // Drizzle - light blue
    case 61:
    case 63:
    case 65:
      return '#29B6F6'; // Rain - medium blue
    case 71:
    case 73:
    case 75:
      return '#E1F5FE'; // Snow - very light blue
    case 77:
      return '#B3E5FC'; // Snow grains - light blue
    case 80:
    case 81:
    case 82:
      return '#03A9F4'; // Rain showers - bright blue
    case 85:
    case 86:
      return '#81D4FA'; // Snow showers - light blue
    case 95:
    case 96:
    case 99:
      return '#FEF008'; // Thunderstorm with hail - Gold
    default:
      return '#FEF008'; // Default to sunny color
  }
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  size = 50,
  color,
}) => {
  // Use the provided color or get a color based on the weather code
  const iconColor = color || getWeatherColor(code);
  
  return (
    <View style={styles.container}>
      <FontAwesome5 name={getWeatherIcon(code)} size={size} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 