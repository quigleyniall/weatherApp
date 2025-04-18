import HorizontalList from "@/components/lists/HorizontalList";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/weather";

interface Props {
  weatherData: WeatherData;
}

const HourlyForecast:React.FC<Props> = ({ weatherData }) => {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - 1);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    let hours = dateObj.getHours();
    return `${hours}:00`;
  };
  
  return (
    <HorizontalList title="Today">
      {weatherData.hourly.time.map(
        (date: string, index: number) =>
          new Date(date) > startDate &&
          new Date(date) < endDate && (
            <WeatherCard 
              key={index} 
              temperature={Math.round(weatherData.hourly.temperature_2m[index])} 
              weatherCode={weatherData.hourly.weather_code[index]} 
              formattedTime={formatDate(date)} 
            />
          )
      )}
    </HorizontalList>
  );
};

export default HourlyForecast;
