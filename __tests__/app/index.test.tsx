import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import TodaysWeather from '../../app/index';
import { WeatherProvider, useWeather } from '../../context/WeatherContext';
import { getWeatherData } from '../../services/weatherService';
import * as ExpoLocation from 'expo-location';

// Mock expo-font
jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  FontAwesome5: 'FontAwesome5',
  Ionicons: 'Ionicons',
}));

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
    icons: [
      {
        icon: 'sun',
        text: 'UV Index',
        subText: 'High',
        iconColor: '#fff',
        size: 30
      },
      {
        icon: 'wind',
        text: 'Wind',
        subText: '10 km/h',
        iconColor: '#fff',
        size: 30
      }
    ]
  },
  tomorrow: {
    summary: {
      temperatureMax: 25,
      temperatureMin: 15,
      weatherCode: 1,
      weatherDescription: 'Sunny',
      title: 'Tomorrow'
    },
    icons: [ {
        icon: 'sun',
        text: 'UV Index',
        subText: 'High',
        iconColor: '#fff',
        size: 30
      },]
  },
  hourly: {
    forecasts: [
      {
        temperature: 22,
        weatherCode: 1,
        formattedTime: '12:00'
      },
      {
        temperature: 24,
        weatherCode: 1,
        formattedTime: '13:00'
      }
    ]
  },
  daily: {
    forecasts: []
  }
};

// Test component to access context
const TestComponent = () => {
  return <TodaysWeather />;
};

describe('TodaysWeather Screen', () => {
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

  it('should render loading state initially', async () => {
    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('should render error state when there is an error', async () => {
    mockedGetWeatherData.mockRejectedValue(new Error('API Error'));

    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByText('Failed to fetch weather data. Please check your internet connection.')).toBeTruthy();
    });
  });

  it('should render weather data when available', async () => {
    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByText('20')).toBeTruthy();
      expect(getByText('Sunny')).toBeTruthy();
      expect(getByText('2024-03-20')).toBeTruthy();
      expect(getByText('UV Index')).toBeTruthy();
      expect(getByText('Wind')).toBeTruthy();
      expect(getByText('Today')).toBeTruthy();
      expect(getByText('7 Days')).toBeTruthy();
    });
  });

  it('should refresh weather data when refresh button is pressed', async () => {
    mockedGetWeatherData.mockRejectedValue(new Error('API Error'));
    
    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    // Wait for initial data to load
    await waitFor(() => {
      expect(mockedGetWeatherData).toHaveBeenCalledTimes(1);
    });

    // Simulate retry button press
    await act(async () => {
      const retryButton = getByText('Retry');
      fireEvent.press(retryButton);
    });

    // Wait for the refresh to complete
    await waitFor(() => {
      expect(mockedGetWeatherData).toHaveBeenCalledTimes(2);
    });
  });
}); 