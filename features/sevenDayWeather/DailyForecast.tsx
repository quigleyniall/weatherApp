import WeatherListItem from "@/components/WeatherListItem";
import { WeatherData } from "@/types/weather";
import { WeatherCodes } from "@/utils/WeatherCodes";

interface Props {
  weatherData: WeatherData;
}

const DailyForecast: React.FC<Props> = ({ weatherData }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dateObj.getDay()];
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  return weatherData.daily.time.map((date: string, index: number) => (
    date > startDate.toISOString() &&
    <WeatherListItem
      key={index}
      temperatureMax={Math.round(weatherData.daily.temperature_2m_max[index])}
      temperatureMin={Math.round(weatherData.daily.temperature_2m_min[index])}
      weatherCode={weatherData.daily.weather_code[index]}
      weatherDescription={
        WeatherCodes[
          weatherData.daily.weather_code[index] as keyof typeof WeatherCodes
        ].split(":")[0]
      }
      formattedDay={formatDate(date)}
    />
  ));
};

export default DailyForecast;

