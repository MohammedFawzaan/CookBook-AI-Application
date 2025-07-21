import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { View, ActivityIndicator } from 'react-native';

function ProtectedStack() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <Stack>
        <Stack.Screen
          name="Landing"
          options={{ headerShown: false }}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="Landing"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="recipe-by-category/index"
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="recipe-detail/index"
        options={{ headerTitle: 'Recipe Details' }}
      />
      <Stack.Screen
        name="RecipeDetails"
        options={{ headerTitle: 'Recipe Details' }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey="pk_test_ZGlyZWN0LWNvbHQtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA" tokenCache={tokenCache}>
      <ProtectedStack />
    </ClerkProvider>
  );
}