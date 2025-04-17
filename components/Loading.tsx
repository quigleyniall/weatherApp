import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => (
    <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  