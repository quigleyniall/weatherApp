import { FormattedWeatherData, WeatherData } from "@/types/weather";
import { WeatherCodes } from "./WeatherCodes";

const formatTime = (date: string): string => {
  const dateObj = new Date(date);
  let hours = dateObj.getHours();
  return `${hours}:00`;
};

const formatCurrentDate = () => {
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-uk", {
    day: "numeric",
    month: "long",
  });
  return `${day}, ${date}`;
};

const formatDay = (date: string): string => {
  const dateObj = new Date(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dateObj.getDay()];
};

const getWeatherDescription = (code: number): string => {
  return (
    WeatherCodes[code as keyof typeof WeatherCodes]?.split(":")[0] || "Unknown"
  );
};

export const transformWeatherData = (
  data: WeatherData
): FormattedWeatherData => {
  const startHourlyDate = new Date();
  startHourlyDate.setHours(startHourlyDate.getHours() - 1);

  const endHourlyDate = new Date();
  endHourlyDate.setDate(endHourlyDate.getDate() + 1);

  const startDailyDate = new Date();
  startDailyDate.setDate(startDailyDate.getDate() + 1);

  return {
    current: {
      summary: {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        formattedDate: formatCurrentDate(),
        weatherDescription: getWeatherDescription(data.current.weather_code),
      },
      icons: [
        {
          icon: "wind",
          text: `${Math.round(data.current.wind_speed_10m)}km/h`,
          subText: "Wind",
        },
        {
          icon: "tint",
          text: `${data.current.relative_humidity_2m}%`,
          subText: "Humidity",
        },
        {
          icon: "water",
          text: `${data.current.precipitation}mm`,
          subText: "Precipitation",
        },
      ],
    },
    tomorrow: {
      summary: {
        title: "Tomorrow",
        temperatureMax: Math.round(data.daily.temperature_2m_max[1]),
        temperatureMin: Math.round(data.daily.temperature_2m_min[1]),
        weatherCode: data.daily.weather_code[1],
        weatherDescription: getWeatherDescription(data.daily.weather_code[1]),
      },
      icons: [
        {
          icon: "wind",
          text: `Up to ${Math.round(data.daily.wind_speed_10m_max[1])} km/h`,
          subText: "Wind",
        },
        {
          icon: "water",
          text: `${data.daily.precipitation_probability_mean[1]}% Chance`,
          subText: "Precipitation",
        },
      ],
    },
    hourly: {
      forecasts: data.hourly.time
        .filter((time) => {
          return (
            new Date(time) > startHourlyDate && new Date(time) < endHourlyDate
          );
        })
        .map((date, index) => ({
          temperature: Math.round(data.hourly.temperature_2m[index]),
          weatherCode: data.hourly.weather_code[index],
          formattedTime: formatTime(date),
        })),
    },
    daily: {
      forecasts: data.daily.time
        .filter((time) => {
          return new Date(time) > startDailyDate;
        })
        .map((date, index) => ({
          temperatureMax: Math.round(data.daily.temperature_2m_max[index]),
          temperatureMin: Math.round(data.daily.temperature_2m_min[index]),
          weatherCode: data.daily.weather_code[index],
          formattedDay: formatDay(date),
          weatherDescription: getWeatherDescription(
            data.daily.weather_code[index]
          ),
        })),
    },
  };
};
