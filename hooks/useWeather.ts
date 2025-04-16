import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/forecast";

const params = {
  tokyo: {
    latitude: 35.6895,
    longitude: 139.6917,
    hourly: "temperature_2m",
    current: ["temperature_2m", "weather_code"],
  },
};

const getDayOfWeek = (dateStr) => {
  const inputDate = new Date(dateStr);
  const today = new Date();

  // Compare year, month, and day
  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate();

  const isTomorrow =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate() + 1;

  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";

  return inputDate.toLocaleDateString("en-US", { weekday: "long" });
};

const useWeather = () => {
  const [weather, setWeather] = useState<any | null>(null); // Using any temporarily until WeatherApiResponse type is defined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const request = await axios.get(API_URL, { params: params.tokyo });
        const hourly = request.data.hourly;

        const maxMinObj = {};
        let j = 0;

        for (let i = 0; i < hourly.time.length; i++) {
          const date = hourly.time[i].split("T")[0];

          if (!maxMinObj[date]) {
            

            maxMinObj[date] = {
              title: getDayOfWeek(date),
              temp: {
                min: Infinity,
                max: -Infinity,
              },
              sortCode: i,
            };
          }

          if (maxMinObj[date].temp.min > hourly.temperature_2m[i]) {
            maxMinObj[date].temp.min = hourly.temperature_2m[i];
          }

          if (maxMinObj[date].temp.max < hourly.temperature_2m[i]) {
            maxMinObj[date].temp.max = hourly.temperature_2m[i];
          }
        }

        request.data.dailyForecast = [...Object.values(maxMinObj)].sort(
          (a, b) => a.sortCode - b.sortCode
        );

        setWeather(request.data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return { weather, loading, error };
};

export default useWeather;
