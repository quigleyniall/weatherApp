import React from 'react';
import { render, act, waitFor, fireEvent } from '@testing-library/react-native';
import { WeatherProvider, useWeather } from '../../context/WeatherContext';
import { getWeatherData } from '../../services/weatherService';
import * as ExpoLocation from 'expo-location';
import { LOCATIONS } from '../../types/weather';
import { View, Text, Pressable } from 'react-native';

// Mock the weather service
jest.mock('../../services/weatherService');
const mockedGetWeatherData = getWeatherData as jest.MockedFunction<typeof getWeatherData>;

// Mock expo-location
jest.mock('expo-location');
const mockedExpoLocation = ExpoLocation as jest.Mocked<typeof ExpoLocation>;

// Mock data
const mockWeatherData = {
  current: {
    summary: {
      temperature: 20,
      weatherCode: 1,
      formattedDate: '2024-03-20',
      weatherDescription: 'Sunny'
    },
    icons: []
  },
  tomorrow: {
    summary: {
      temperatureMax: 25,
      temperatureMin: 15,
      weatherCode: 1,
      weatherDescription: 'Sunny',
      title: 'Tomorrow'
    },
    icons: []
  },
  hourly: {
    forecasts: []
  },
  daily: {
    forecasts: []
  }
};

// Test component to access context
const TestComponent = () => {
  const context = useWeather();
  return (
    <View>
      <Text testID="weather-data">{context.weatherData ? 'has-data' : 'no-data'}</Text>
      <Text testID="loading">{context.loading.toString()}</Text>
      <Text testID="error">{context.error || 'no-error'}</Text>
      <Text testID="location">{context.selectedLocation.name}</Text>
      <Pressable testID="refresh-button" onPress={context.refreshWeather}>Refresh</Pressable>
      <Pressable testID="update-location" onPress={() => context.setSelectedLocation(LOCATIONS[1])}>Update Location</Pressable>
    </View>
  );
};

describe('WeatherContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    mockedGetWeatherData.mockResolvedValue(mockWeatherData);
    mockedExpoLocation.requestForegroundPermissionsAsync.mockResolvedValue({ 
      status: ExpoLocation.PermissionStatus.GRANTED,
      granted: true,
      expires: 'never',
      canAskAgain: true
    });
    mockedExpoLocation.getCurrentPositionAsync.mockResolvedValue({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        altitude: null,
        accuracy: 5,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    });
    mockedExpoLocation.reverseGeocodeAsync.mockResolvedValue([{
      city: 'New York',
      region: 'NY',
      country: 'USA',
      district: null,
      streetNumber: null,
      street: null,
      subregion: null,
      name: null,
      postalCode: null,
      timezone: null,
      isoCountryCode: null,
      formattedAddress: 'New York, NY, USA'
    }]);
  });

  it('should initialize with default location when no current location is available', async () => {
    mockedExpoLocation.requestForegroundPermissionsAsync.mockResolvedValue({ 
      status: ExpoLocation.PermissionStatus.DENIED,
      granted: false,
      expires: 'never',
      canAskAgain: true
    });

    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByTestId('location')).toHaveTextContent(LOCATIONS[0].name);
    });
  });

  it('should fetch weather data for current location when available', async () => {
    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(mockedGetWeatherData).toHaveBeenCalledWith({
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.0060
      });
      expect(getByTestId('weather-data')).toHaveTextContent('has-data');
      expect(getByTestId('location')).toHaveTextContent('New York');
    });
  });

  it('should handle weather data fetch errors', async () => {
    mockedGetWeatherData.mockRejectedValue(new Error('API Error'));

    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByTestId('error')).toHaveTextContent('Failed to fetch weather data', {exact: false});
    });
  });

  it('should update selected location and fetch new weather data', async () => {
    
    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByTestId('location')).toHaveTextContent(LOCATIONS[0].name);
    });

    // Simulate location change
    await act(async () => {
      const updateLocationButton = getByTestId('update-location');
      fireEvent.press(updateLocationButton);
    });

    await waitFor(() => {
      expect(getByTestId('location')).toHaveTextContent(LOCATIONS[1].name);
      expect(mockedGetWeatherData).toHaveBeenCalledWith(LOCATIONS[1]);
    });
  });

  it('should refresh weather data when refreshWeather is called', async () => {
    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByTestId('weather-data')).toHaveTextContent('has-data');
    });

    // Simulate refresh
    await act(async () => {
      const refreshButton = getByTestId('refresh-button');
      fireEvent.press(refreshButton);
    });

    expect(mockedGetWeatherData).toHaveBeenCalledTimes(2);
  });
}); 