import VerticalList from "@/components/lists/VerticalList";
import WeatherListItem from "@/components/WeatherListItem";
import { WeatherData } from "@/types/weather";

const DailyForecast = ({ weatherData }: { weatherData: WeatherData }) => {
    return (
        <VerticalList title="Daily Forecast">
            {weatherData.daily.time.map((date: string, index: number) => (
                <WeatherListItem key={index}weatherData={weatherData} index={index} date={date} />
            ))}
        </VerticalList>
    )
}

export default DailyForecast;