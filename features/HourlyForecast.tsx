import HorizontalList from "@/components/HorizontalList";
import WeatherCard from "@/components/WeatherCard";

const HourlyForecast = ({ list }) => {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - 1);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);

  return (
    <HorizontalList title="Hourly Forecast">
      {list.time.map(
        (date: string, index: number) =>
          new Date(date) > startDate &&
          new Date(date) < endDate && (
            <WeatherCard list={list} index={index} date={date} />
          )
      )}
    </HorizontalList>
  );
};

export default HourlyForecast;
