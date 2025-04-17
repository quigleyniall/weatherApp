import HorizontalList from "@/components/lists/HorizontalList";
import WeatherCard from "@/components/WeatherCard";

const HourlyForecast = ({ list }: { list: any }) => {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - 1);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  
  return (
    <HorizontalList title="Today">
      {list.time.map(
        (date: string, index: number) =>
          new Date(date) > startDate &&
          new Date(date) < endDate && (
            <WeatherCard key={index} list={list} index={index} date={date} />
          )
      )}
    </HorizontalList>
  );
};

export default HourlyForecast;
