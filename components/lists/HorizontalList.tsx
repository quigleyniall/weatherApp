import { WeatherCodes } from "@/utils/WeatherCodes";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const HorizontalList = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default HorizontalList;
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    fontFamily: 'Inter-Regular',
  },
});
