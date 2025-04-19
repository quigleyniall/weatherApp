import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import SevenDaysWeather from "@/app/sevenDaysWeather";
import { WeatherProvider } from "@/context/WeatherContext";
import { getWeatherData } from "@/services/weatherService";
import * as ExpoLocation from "expo-location";

// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  FontAwesome5: "FontAwesome5",
  Ionicons: "Ionicons",
}));

// Mock the weather service
jest.mock("@/services/weatherService");
const mockedGetWeatherData = getWeatherData as jest.MockedFunction<
  typeof getWeatherData
>;

// Mock expo-location
jest.mock("expo-location");
const mockedExpoLocation = ExpoLocation as jest.Mocked<typeof ExpoLocation>;

describe("SevenDaysWeather", () => {
  const mockWeatherData = {
    current: {
      summary: {
        temperature: 20,
        weatherCode: 1,
        weatherDescription: "Sunny",
        formattedDate: "2024-03-20",
      },
      icons: [
        {
          icon: "wind",
          text: "10km/h",
          subText: "Wind",
        },
        {
          icon: "tint",
          text: "60%",
          subText: "Humidity",
        },
      ],
    },
    tomorrow: {
      summary: {
        temperatureMax: 25,
        temperatureMin: 15,
        weatherCode: 1,
        weatherDescription: "Sunny",
        title: "Tomorrow",
        formattedDate: "2024-03-21",
      },
      icons: [
        {
          icon: "wind",
          text: "15km/h",
          subText: "Wind",
        },
        {
          icon: "water",
          text: "20%",
          subText: "Rain",
        },
      ],
    },
    hourly: {
      forecasts: [],
    },
    daily: {
      forecasts: [
        {
          date: "2024-03-20",
          temperatureMax: 25,
          temperatureMin: 15,
          weatherCode: 1,
          weatherDescription: "Sunny",
          formattedDay: "Mon",
        },
      ],
    },
  };

  // Test component to access context
  const TestComponent = () => {
    return <SevenDaysWeather />;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    mockedGetWeatherData.mockResolvedValue(mockWeatherData);
    mockedExpoLocation.requestForegroundPermissionsAsync.mockResolvedValue({
      status: ExpoLocation.PermissionStatus.GRANTED,
      granted: true,
      expires: "never",
      canAskAgain: true,
    });
    mockedExpoLocation.getCurrentPositionAsync.mockResolvedValue({
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        altitude: null,
        accuracy: 5,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
    mockedExpoLocation.reverseGeocodeAsync.mockResolvedValue([
      {
        city: "New York",
        region: "NY",
        country: "USA",
        district: null,
        streetNumber: null,
        street: null,
        subregion: null,
        name: null,
        postalCode: null,
        timezone: null,
        isoCountryCode: null,
        formattedAddress: "New York, NY, USA",
      },
    ]);
  });

  it("should render loading state initially", async () => {
    const { getByTestId } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("should render error component when there is an error", async () => {
    mockedGetWeatherData.mockRejectedValue(new Error("API Error"));

    const { getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(
        getByText(
          "Failed to fetch weather data. Please check your internet connection."
        )
      ).toBeTruthy();
    });
  });

  it("should render weather data when available", async () => {
    const { getAllByText, getByText } = render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    await waitFor(() => {
      // Check for temperature values
      expect(getByText("25")).toBeTruthy();
      expect(getByText("15")).toBeTruthy();

      // Check for "Tomorrow" text which is unique
      expect(getByText("Tomorrow")).toBeTruthy();

      const sunnyElements = getAllByText("Sunny");
      // One in summary section and one in daily section
      expect(sunnyElements.length).toBe(2);
    });
  });
});
