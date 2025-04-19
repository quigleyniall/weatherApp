import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface WeatherIconProps {
  code: number;
  size?: number;
}

const getWeatherIcon = (code: number): ImageSourcePropType => {
  // Weather codes based on Open-Meteo API documentation
  switch (code) {
    case 0:
      return require('@/assets/weather-icons/sunny.png'); // Clear sky
    case 1:
    case 2:
    case 3:
      return require('@/assets/weather-icons/clouds.png'); // Partly cloudy
    case 45:
    case 48:
      return require('@/assets/weather-icons/clouds.png'); // Foggy
    case 51:
    case 53:
    case 55:
      return require('@/assets/weather-icons/rain.png'); // Drizzle
    case 61:
    case 63:
    case 65:
      return require('@/assets/weather-icons/rain.png'); // Rain
    case 71:
    case 73:
    case 75:
      return require('@/assets/weather-icons/snowing.png'); // Snow
    case 77:
      return require('@/assets/weather-icons/snowing.png'); // Snow grains
    case 80:
    case 81:
    case 82:
      return require('@/assets/weather-icons/rain.png'); // Rain showers
    case 85:
    case 86:
      return require('@/assets/weather-icons/snowing.png'); // Snow showers
    case 95:
    case 96:
    case 99:
      return require('@/assets/weather-icons/thunderstorm.png'); // Thunderstorm
    default:
      return require('@/assets/weather-icons/sunny.png');
  }
};


export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  size = 50
}) => {
  
  return (
    <View style={styles.container}>
      <Image 
        source={getWeatherIcon(code)} 
        style={[styles.icon, { width: size, height: size }]} 
        resizeMode="contain"
      />
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
}); 