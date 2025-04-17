import { ScrollView, View, Text, StyleSheet } from "react-native";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const HorizontalList: React.FC<Props> = ({ title, children }) => {
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
    fontFamily: "Inter-Regular",
  },
});
