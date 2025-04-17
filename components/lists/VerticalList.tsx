import { ScrollView, View, Text, StyleSheet } from "react-native";

const VerticalList = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
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
    fontFamily: 'Inter-Regular',
  },
});
