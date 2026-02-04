import { useAuth } from "@clerk/clerk-expo";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  return <Redirect href={'/Landing'} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});