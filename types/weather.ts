export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export const LOCATIONS: Location[] = [
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Hong Kong', latitude: 22.3193, longitude: 114.1694 },
  { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018 },
  { name: 'St. Petersburg', latitude: 59.9343, longitude: 30.3351 },
  { name: 'Kiev', latitude: 50.4501, longitude: 30.5234 },
  { name: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
  { name: 'Dublin', latitude: 53.3498, longitude: -6.2603 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Mexico City', latitude: 19.4326, longitude: -99.1332 },
];