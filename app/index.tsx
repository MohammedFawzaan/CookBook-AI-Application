import { View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>
      <Redirect href={'/Landing'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});