import axios from 'axios';
import { WeatherData, Location } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';

export const getWeatherData = async (location: Location): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
        daily: 'temperature_2m_max,wind_speed_10m_max,temperature_2m_min,weather_code,sunrise,sunset,precipitation_probability_mean',
        hourly: 'temperature_2m,weather_code',
        timezone: 'auto',
        forecast_days: 8,
      },
    });
    
    return response.data;
  } catch (error) {
    
    throw new Error('Failed to fetch weather data');
  }
}; 