import VerticalList from "@/components/VerticalList";
import WeatherListItem from "@/components/WeatherListItem";

const DailyForecast = ({ weatherData }: { weatherData: any }) => {
    return (
        <VerticalList title="Daily Forecast">
            {weatherData.daily.time.map((date: string, index: number) => (
                <WeatherListItem key={index}weatherData={weatherData} index={index} date={date} />
            ))}
        </VerticalList>
    )
}

export default DailyForecast;