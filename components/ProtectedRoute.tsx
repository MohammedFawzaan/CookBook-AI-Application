import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!isSignedIn) {
    router.replace('/Landing');
    return null;
  }

  return <>{children}</>;
}