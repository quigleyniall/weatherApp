import { transformWeatherData } from '@/utils/weatherDataTransformer';
import { WeatherData } from '@/types/weather';

describe('Weather Data Transformer', () => {
  // only validate from now to 24 hours in the future
  const validHourlyDate = new Date();
  validHourlyDate.setHours(validHourlyDate.getHours() + 1);

  const invalidHourlyDate = new Date();
  invalidHourlyDate.setDate(invalidHourlyDate.getDate() + 2);

  const sampleWeatherData: WeatherData = {
    current: {
      temperature_2m: 20.5,
      relative_humidity_2m: 60,
      precipitation: 0,
      weather_code: 1,
      wind_speed_10m: 10.2
    },
    daily: {
      time: ['2027-03-20', '2027-03-21', '2027-03-22'],
      temperature_2m_max: [25.3, 26.7, 24.1],
      temperature_2m_min: [15.8, 16.2, 14.5],
      weather_code: [1, 2, 3],
      wind_speed_10m_max: [15.5, 16.8, 14.2],
      precipitation_probability_mean: [20, 30, 40]
    },
    hourly: {
      time: [
        validHourlyDate.toISOString(),
        validHourlyDate.toISOString(),
        validHourlyDate.toISOString(),
        validHourlyDate.toISOString(),
        invalidHourlyDate.toISOString(),
      ],
      temperature_2m: [22, 22.3, 24.7, 23.1, 21.5],
      weather_code: [0, 1, 1, 2, 2]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transform current weather data correctly', () => {
    const result = transformWeatherData(sampleWeatherData);
    
    // Check current weather data
    expect(result.current.summary.temperature).toBe(21); // Rounded from 20.5
    expect(result.current.summary.weatherCode).toBe(1);
    expect(result.current.summary.weatherDescription).toBe('Mainly clear');
    
    // Check current weather icons
    expect(result.current.icons).toHaveLength(3);
    expect(result.current.icons[0].icon).toBe('wind');
    expect(result.current.icons[0].text).toBe('10km/h'); // Rounded from 10.2
    expect(result.current.icons[1].icon).toBe('tint');
    expect(result.current.icons[1].text).toBe('60%');
    expect(result.current.icons[2].icon).toBe('water');
    expect(result.current.icons[2].text).toBe('0mm');
  });

  it('should transform tomorrow weather data correctly', () => {
    const result = transformWeatherData(sampleWeatherData);
    
    // Check tomorrow weather data
    expect(result.tomorrow.summary.title).toBe('Tomorrow');
    expect(result.tomorrow.summary.temperatureMax).toBe(27); // Rounded from 26.7
    expect(result.tomorrow.summary.temperatureMin).toBe(16); // Rounded from 16.2
    expect(result.tomorrow.summary.weatherCode).toBe(2);
    expect(result.tomorrow.summary.weatherDescription).toBe('Partly cloudy');
    
    // Check tomorrow weather icons
    expect(result.tomorrow.icons).toHaveLength(2);
    expect(result.tomorrow.icons[0].icon).toBe('wind');
    expect(result.tomorrow.icons[0].text).toBe('Up to 17 km/h'); // Rounded from 16.8
    expect(result.tomorrow.icons[1].icon).toBe('water');
    expect(result.tomorrow.icons[1].text).toBe('30% Chance');
  });

  it('should transform hourly forecast data correctly', () => {
    const result = transformWeatherData(sampleWeatherData);
    
    // Check hourly forecast data
    expect(result.hourly.forecasts.length).toBe(4);
    
    // Check the first hourly forecast
    expect(result.hourly.forecasts[0].temperature).toBe(22); // Rounded from 22.3
    expect(result.hourly.forecasts[0].weatherCode).toBe(0);
  });

  it('should transform daily forecast data correctly', () => {
    const result = transformWeatherData(sampleWeatherData);
    
    // Check daily forecast data
    expect(result.daily.forecasts.length).toBe(3);
    
    // Check the first daily forecast
    expect(result.daily.forecasts[0].temperatureMax).toBe(25); // Rounded from 25.3
    expect(result.daily.forecasts[0].temperatureMin).toBe(16); // Rounded from 15.8
    expect(result.daily.forecasts[0].weatherCode).toBe(1);
    expect(result.daily.forecasts[0].weatherDescription).toBe('Mainly clear');
    expect(result.daily.forecasts[0].formattedDay).toBe('Sat'); // Assuming March 20, 2027 is a Saturday
  });

  
}); 