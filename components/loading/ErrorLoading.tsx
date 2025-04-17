import { TouchableOpacity } from "react-native";

import { View, Text, StyleSheet } from "react-native";

const ErrorLoading = ({ error, refreshWeather }: { error: string, refreshWeather: () => void }) => (
    <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={refreshWeather}>
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

export default ErrorLoading;

const styles = StyleSheet.create({
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: "red",
      textAlign: "center",
      marginBottom: 20,
      fontFamily: 'Inter-Regular',
    },
    retryButton: {
      backgroundColor: "#4A90E2",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    retryButtonText: {
      color: "white",
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
  });
  