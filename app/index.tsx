import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import CreateRecipe from "@/components/CreateRecipe";

export default function Index() {
  return (
    <View
      style={styles.container}>
      <Redirect href={'/Landing'} />
      {/* <CreateRecipe /> */}
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