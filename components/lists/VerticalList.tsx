import { ScrollView, View, Text, StyleSheet } from "react-native";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const VerticalList: React.FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView showsVerticalScrollIndicator>{children}</ScrollView>
    </View>
  );
};

export default VerticalList;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
});
