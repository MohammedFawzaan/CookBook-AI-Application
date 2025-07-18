import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen
          name="Landing"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="recipe-by-category/index"
          options={{
            headerTitle: ''
          }}
        />
        <Stack.Screen
          name="recipe-detail/index"
          options={{
            headerTitle: ''
          }}
        />
        <Stack.Screen
          name="RecipeDetails"
          options={{
            headerShown: false
          }}
        />
      </Stack>
  );
}