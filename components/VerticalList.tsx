import { WeatherCodes } from "@/utils/WeatherCodes";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const VerticalList = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <View style={styles.forecastContainer}>
      <Text style={styles.forecastTitle}>
        {title}
      </Text>
      <ScrollView showsVerticalScrollIndicator>
        {children}
      </ScrollView>
    </View>
  );
};

export default VerticalList;
const styles = StyleSheet.create({
  forecastContainer: {
    width: "100%",
    marginTop: 20,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
});
