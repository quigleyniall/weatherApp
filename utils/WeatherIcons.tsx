import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WeatherCodes } from './WeatherCodes';

const WeatherIcon = ({ code } : { code: number }) => {
  const iconMap = {
    0: "wb_sunny",                  // Clear sky ☀️
    1: "wb_sunny",                  // Mainly clear 🌤️
    2: "partly_cloudy_day",         // Partly cloudy ⛅
    3: "cloud",                     // Overcast ☁️
    45: "foggy",                    // Fog 🌫️
    48: "foggy",                    // Depositing rime fog 🌫️❄️
    51: "rainy_light",              // Drizzle: Light 🌦️
    53: "rainy",                    // Drizzle: Moderate 🌧️
    55: "rainy_heavy",              // Drizzle: Dense 🌧️🌧️
    56: "rainy_snow",               // Freezing Drizzle: Light 🌧️❄️
    57: "rainy_snow_heavy",         // Freezing Drizzle: Dense 🌧️❄️❄️
    61: "rainy_light",              // Rain: Slight 🌦️
    63: "rainy",                    // Rain: Moderate 🌧️
    65: "rainy_heavy",              // Rain: Heavy 🌧️🌧️
    66: "rainy_snow",               // Freezing Rain: Light 🌧️❄️
    67: "rainy_snow_heavy",         // Freezing Rain: Heavy 🌧️❄️❄️
    71: "weather_snowy_light",      // Snow fall: Slight 🌨️
    73: "weather_snowy",            // Snow fall: Moderate 🌨️🌨️
    75: "ac_unit",                  // Snow fall: Heavy ❄️❄️❄️
    77: "grain",                    // Snow grains 🌨️✨
    80: "rainy_light",              // Rain showers: Slight 🌦️
    81: "rainy",                    // Rain showers: Moderate 🌧️
    82: "thunderstorm",             // Rain showers: Violent ⛈️
    85: "weather_snowy",            // Snow showers: Slight 🌨️
    86: "ac_unit",                  // Snow showers: Heavy 🌨️❄️
    95: "thunderstorm",             // Thunderstorm ⛈️
    96: "thunderstorm_with_hail",   // Thunderstorm with slight hail ⛈️🌨️
    99: "thunderstorm_with_hail"    // Thunderstorm with heavy hail ⛈️❄️❄️
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <MaterialIcons name={iconMap[code as keyof typeof iconMap]} size={60} color="black" />
      <Text>{WeatherCodes[code as keyof typeof WeatherCodes]}</Text>
    </View>
  );
};

export default WeatherIcon;

