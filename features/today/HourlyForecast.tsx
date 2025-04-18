import HorizontalList from "@/components/lists/HorizontalList";
import WeatherCard from "@/components/WeatherCard";
import { HourlyForecast as HourlyForecastType } from "@/types/weather";

const HourlyForecast: React.FC<{ forecasts: HourlyForecastType[] }> = ({ forecasts }) => {
  return (
    <HorizontalList title="Today" linkText="7 Days" link="/sevenDaysWeather">
      {forecasts.map((forecast: HourlyForecastType, index: number) => (
        <WeatherCard
          key={index} 
          {...forecast}
        />
      ))}
    </HorizontalList>
  );
};

export default HourlyForecast;
