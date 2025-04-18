import HorizontalList from "@/components/lists/HorizontalList";
import WeatherCard from "@/components/WeatherCard";

interface Forecast {
  temperature: number;
  weatherCode: number;
  formattedTime: string;
}

const HourlyForecast: React.FC<{ forecasts: Forecast[] }> = ({ forecasts }) => {
  return (
    <HorizontalList title="Today" linkText="7 Days" link="/sevenDaysWeather">
      {forecasts.map((forecast: Forecast, index: number) => (
        <WeatherCard
          key={index} 
          {...forecast}
        />
      ))}
    </HorizontalList>
  );
};

export default HourlyForecast;
