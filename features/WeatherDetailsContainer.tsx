import { WeatherIcons } from "@/types/weather";
import { View, StyleSheet } from "react-native";
import WeatherDetails from "@/components/WeatherDetails";

const WeatherDetailsContainer: React.FC<{ icons: WeatherIcons[] }> = ({
  icons,
}) => (
  <View style={styles.detailsContainer}>
    {icons.map(({ icon, text, subText }, index) => (
      <WeatherDetails
        key={index}
        icon={icon}
        iconColor="#fff"
        text={text}
        size={30}
        subText={subText}
      />
    ))}
  </View>
);

export default WeatherDetailsContainer;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 30,
    borderTopWidth: 2,
    borderTopColor: "#5EA0EB",
  },
});
