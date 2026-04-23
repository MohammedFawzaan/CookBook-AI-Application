import { Redirect, Stack, usePathname } from "expo-router";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalApi from "@/services/GlobalApi";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function ProtectedStack() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    const syncAuth = async () => {
      if (isSignedIn && user) {
        const token = await getToken();
        const email = user.primaryEmailAddress?.emailAddress;
        GlobalApi.setAuthToken(token, email, getToken);
      } else {
        GlobalApi.setAuthToken(null, null);
      }
    };

    syncAuth();
  }, [isSignedIn, isLoaded, getToken, user]);

  if (!isLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );

  const isLoginScreen = pathname === '/' || pathname === '/index' || !pathname || pathname === 'index';

  // Strict Auth Guard: If not signed in and not on landing, force redirect to landing
  if (!isLoaded) return null; // Wait for clerk

  if (!isSignedIn && !isLoginScreen) {
    return <Redirect href="/" />;
  }

  // If signed in and on landing, force redirect to Home
  if (isSignedIn && isLoginScreen) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="recipe-by-category/index" />
      <Stack.Screen name="recipe-detail/index" />
      <Stack.Screen name="RecipeDetails" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider>
        <ProtectedStack />
      </ThemeProvider>
    </ClerkProvider>
  );
}
