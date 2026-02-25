import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@clerk/clerk-expo';
import { shareRecipe } from '@/utils/ShareRecipe';

export default function RecipeDetail() {
  const { recipeData } = useLocalSearchParams();
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : JSON.parse(recipeData[0]);
  const router = useRouter();
  const { user } = useUser();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [imageLoading, setImageLoading] = useState(true);

  const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
  const authorLabel = recipe.userEmail
    ? recipe.userEmail === currentUserEmail
      ? 'You'
      : recipe.userEmail
    : null;

  const hasRemoteImage = recipe?.recipeImage &&
    (recipe.recipeImage.includes('https') || recipe.recipeImage.startsWith('data:'));

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={hasRemoteImage
              ? { uri: recipe.recipeImage.replace('ai-guru-lab-images/', 'ai-guru-lab-images%2F') }
              : require('./../assets/images/RecipeImage.png')}
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          {imageLoading && hasRemoteImage && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.15)', colors.background as any]}
            style={styles.bottomGradient}
          />
          {/* Header button overlays */}
          <View style={[styles.headerButtons, { top: insets.top > 0 ? insets.top + 5 : 15 }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => shareRecipe(recipe)}
              style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
              activeOpacity={0.7}
            >
              <Ionicons name="share-social-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Section */}
        <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>{recipe.recipeName}</Text>

          {/* Author chip */}
          {authorLabel && (
            <View style={[styles.authorChip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.authorText, { color: colors.textSecondary }]}>
                👤 Created by <Text style={{ fontWeight: '700', color: '#2e7d32' }}>{authorLabel}</Text>
              </Text>
            </View>
          )}

          <Text style={[styles.description, { color: colors.textSecondary }]}>{recipe.description}</Text>

          {/* Key Stats */}
          <View style={[styles.statsContainer, { backgroundColor: colors.statsCard, borderColor: colors.border }]}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.card }]}>
                <Text style={styles.statIcon}>🔥</Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Calories</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{recipe.calories || 'N/A'}</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.card }]}>
                <Text style={styles.statIcon}>⏱️</Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Time</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{recipe.cookTime || 'N/A'}</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.card }]}>
                <Text style={styles.statIcon}>👥</Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Servings</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{recipe.serveTo || 'N/A'}</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🥦 Ingredients</Text>
            <View style={[styles.ingredientsList, { backgroundColor: colors.ingredientCard, borderColor: colors.border }]}>
              {recipe.ingredients?.map((item: any, index: any) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={[styles.ingredientText, { color: colors.textSecondary }]}>
                    {item.icon} {item.ingredient} {item.quantity ? `- ${item.quantity}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Steps */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>👨‍🍳 Instructions</Text>
            {recipe.steps?.map((step: any, index: any) => (
              <View key={index} style={[styles.stepBox, { backgroundColor: colors.stepCard, borderColor: colors.border }]}>
                <View style={[styles.stepNumberContainer, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: colors.textSecondary }]}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <LinearGradient
            colors={['#1b5e20', '#2e7d32', '#43a047']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.footerCard}
          >
            <Text style={styles.footerEmoji}>🍽️</Text>
            <Text style={styles.footerTitle}>Enjoy your Meal!</Text>
            <Text style={styles.footerSubtitle}>Recipe Saved in your CookBook</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  imageContainer: { height: 340, width: '100%', position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageLoader: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  bottomGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 },
  headerButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  contentContainer: {
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  title: {
    fontSize: 28, fontWeight: '800', marginBottom: 8,
    fontFamily: 'outfit-bold', lineHeight: 34,
  },
  authorChip: {
    alignSelf: 'flex-start', borderRadius: 20, borderWidth: 1,
    paddingVertical: 5, paddingHorizontal: 12, marginBottom: 12,
  },
  authorText: { fontSize: 13, fontFamily: 'outfit' },
  description: {
    fontSize: 16, lineHeight: 24, marginBottom: 22, fontFamily: 'outfit',
  },
  statsContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    borderRadius: 18, padding: 16, marginBottom: 25, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statIconContainer: {
    padding: 9, borderRadius: 50, marginBottom: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },
  statIcon: { fontSize: 20 },
  statLabel: { fontSize: 12, marginBottom: 3, fontFamily: 'outfit' },
  statValue: { fontSize: 13, fontWeight: '700', fontFamily: 'outfit-medium', textAlign: 'center' },
  divider: { width: 1, height: '80%', alignSelf: 'center' },
  sectionContainer: { marginBottom: 26 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14, fontFamily: 'outfit-bold' },
  ingredientsList: { borderRadius: 15, padding: 15, borderWidth: 1 },
  ingredientItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  ingredientText: { fontSize: 16, lineHeight: 22, flex: 1, fontFamily: 'outfit' },
  stepBox: {
    flexDirection: 'row', marginBottom: 18,
    borderRadius: 14, padding: 14, borderWidth: 1,
  },
  stepNumberContainer: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#2e7d32', justifyContent: 'center',
    alignItems: 'center', marginRight: 14, flexShrink: 0,
  },
  stepNumber: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  stepText: { fontSize: 15, lineHeight: 23, flex: 1, fontFamily: 'outfit' },
  footerCard: {
    borderRadius: 20, paddingVertical: 28, paddingHorizontal: 20,
    alignItems: 'center', marginTop: 10,
    shadowColor: '#2e7d32', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  footerEmoji: { fontSize: 38, marginBottom: 8 },
  footerTitle: { color: 'white', fontWeight: '800', fontSize: 22, fontFamily: 'outfit-bold', marginBottom: 4 },
  footerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'outfit' },
});