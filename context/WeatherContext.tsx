import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherData, Location, LOCATIONS } from '../types/weather';
import { getWeatherData } from '../services/weatherService';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

interface WeatherContextType {
  weatherData: WeatherData | null;
  selectedLocation: Location;
  locations: Location[];
  loading: boolean;
  error: string | null;
  setSelectedLocation: (location: Location) => void;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(LOCATIONS[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Weather app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  };

  const getCurrentLocation = async (): Promise<Location | null> => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return null;

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve({
              name: 'Current Location',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => reject(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      });
    } catch (error) {
      return null;
    }
  };

  const fetchWeatherData = async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeWeather = async () => {
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        setSelectedLocation(currentLocation);
        await fetchWeatherData(currentLocation);
      } else {
        await fetchWeatherData(selectedLocation);
      }
    };

    initializeWeather();
  }, []);

  const refreshWeather = async () => {
    await fetchWeatherData(selectedLocation);
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        selectedLocation,
        locations: LOCATIONS,
        loading,
        error,
        setSelectedLocation: async (location: Location) => {
          setSelectedLocation(location);
          await fetchWeatherData(location);
        },
        refreshWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 