import { Text, View } from "react-native";
import CreateRecipe from "@/components/CreateRecipe";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CreateRecipe />
    </View>
  );
}