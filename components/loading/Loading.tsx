import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoadingProps {
  testID?: string;
}

const Loading = ({ testID }: LoadingProps) => (
  <View style={styles.loadingContainer} testID={testID}>
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
  