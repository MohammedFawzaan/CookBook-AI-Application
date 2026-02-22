import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.log('Sign out error:', err);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>👋 {user?.fullName || 'Guest'}</Text>
      <View style={styles.mainContainer}>
        <Image source={{ uri: user?.imageUrl }} style={{ width: 70, height: 70, borderRadius: 35 }} />
        <Text style={[styles.title, { color: colors.textSecondary }]}>{user?.primaryEmailAddress?.emailAddress}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    gap: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'outfit-bold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'outfit',
  },
  button: {
    backgroundColor: '#f44336',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
});