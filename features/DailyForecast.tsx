import { View, Text, StyleSheet } from "react-native";
import WeatherListItem from "@/components/WeatherListItem";
import { WeatherData } from "@/types/weather";
import VerticalList from "@/components/lists/VerticalList";
import { WeatherCodes } from "@/utils/WeatherCodes";


interface Props {
    weatherData: WeatherData;
  }

const DailyForecast:React.FC<Props> = ({ weatherData }) => {
    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[dateObj.getDay()];
    };
    
    return (
     <VerticalList title="7 Day Forecast">
            {weatherData.daily.time.map((date: string, index: number) => (
                        <WeatherListItem 
                            key={index} 
                            temperatureMax={Math.round(weatherData.daily.temperature_2m_max[index])} 
                            temperatureMin={Math.round(weatherData.daily.temperature_2m_min[index])} 
                            weatherCode={weatherData.daily.weather_code[index]} 
                            weatherDescription={WeatherCodes[weatherData.daily.weather_code[index] as keyof typeof WeatherCodes].split(":")[0]}
                            formattedDay={formatDate(date)} 
                        />
                    )
            )}
            
        </VerticalList>
    )
}

export default DailyForecast;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
});