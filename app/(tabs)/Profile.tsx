import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import GlobalApi from '@/services/GlobalApi';

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { colors } = useTheme();
  const [recipeCount, setRecipeCount] = useState<number | null>(null);

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      GlobalApi.GetUserCreatedRecipe(email)
        .then((res) => setRecipeCount(res?.data?.data?.length ?? 0))
        .catch(() => setRecipeCount(0));
    }
  }, [user]);

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
        {/* Avatar */}
        <Image source={{ uri: user?.imageUrl }} style={[styles.avatar, { borderColor: colors.primary }]} />

        {/* Email */}
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        {/* Recipe Count Stat Card */}
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.statEmoji}>🍳</Text>
          <View>
            {recipeCount === null ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={[styles.statNumber, { color: colors.primary }]}>{recipeCount}</Text>
            )}
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Recipes Created</Text>
          </View>
        </View>

        {/* Sign Out */}
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
    marginTop: 40,
    gap: 14,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'outfit-bold',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
  },
  email: {
    fontSize: 16,
    fontFamily: 'outfit',
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 36,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'outfit-bold',
    lineHeight: 36,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'outfit',
    marginTop: 2,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
});
