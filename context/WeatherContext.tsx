import React, { createContext, useContext, useState, useEffect } from "react";
import { Location, LOCATIONS } from "../types/weather";
import { getWeatherData } from "../services/weatherService";
import * as ExpoLocation from "expo-location";
import { FormattedWeatherData } from "../types/weather";

interface WeatherContextType {
  weatherData: FormattedWeatherData | null;
  selectedLocation: Location;
  myLocation: Location | null;
  locations: Location[];
  loading: boolean;
  error: string | null;
  setSelectedLocation: (location: Location) => void;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    LOCATIONS[0]
  );
  const [myLocation, setMyLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>(LOCATIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async (): Promise<Location | null> => {
    try {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      
      const locationName = await ExpoLocation.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        name: locationName[0].city || locationName[0].region || locationName[0].country || "Unknown",
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    } catch (error) {
      console.log("err", error);
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
      setError(
        "Failed to fetch weather data. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeWeather = async () => {
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        setSelectedLocation(currentLocation);
        setMyLocation(currentLocation);
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
        myLocation,
        locations,
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
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
