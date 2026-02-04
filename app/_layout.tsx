import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { View, ActivityIndicator } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function ProtectedStack() {
  const { isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Landing" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="recipe-by-category/index" options={{ headerShown: true, title: "Recipes" }} />
      <Stack.Screen name="recipe-detail/index" options={{ headerShown: true, title: "Details" }} />
      <Stack.Screen name="RecipeDetails" options={{ headerShown: true, title: "Details" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ProtectedStack />
    </ClerkProvider>
  );
}
