import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecipeDetail() {
  const { recipeData } = useLocalSearchParams();
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : JSON.parse(recipeData[0]);
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={recipe?.recipeImage && (recipe.recipeImage.includes('http') || recipe.recipeImage.startsWith('data:'))
              ? { uri: recipe?.recipeImage.replace('ai-guru-lab-images/', 'ai-guru-lab-images%2F') }
              : require('./../assets/images/RecipeImage.png')}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.2)']}
            style={styles.gradientOverlay}
          />
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/Home')} style={styles.iconButton}>
              <Ionicons name="home" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{recipe.recipeName}</Text>
          <Text style={styles.description}>{recipe.description}</Text>

          {/* Key Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🔥</Text>
              </View>
              <Text style={styles.statLabel}>Calories</Text>
              <Text style={styles.statValue}>{recipe.calories || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>⏱️</Text>
              </View>
              <Text style={styles.statLabel}>Time</Text>
              <Text style={styles.statValue}>{recipe.cookTime || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>👥</Text>
              </View>
              <Text style={styles.statLabel}>Servings</Text>
              <Text style={styles.statValue}>{recipe.serveTo || 'N/A'}</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients?.map((item: any, index: any) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>
                    {item.ingredient} {item.quantity ? `- ${item.quantity}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Steps */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.steps?.map((step: any, index: any) => (
              <View key={index} style={styles.stepBox}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Footer Message */}
          <View style={styles.footerMessage}>
            <Text style={styles.footerText}>😊 Recipe Saved</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 50,
    backdropFilter: 'blur(10px)',
  },
  contentContainer: {
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 10,
    fontFamily: 'outfit-bold',
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
    fontFamily: 'outfit',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    fontFamily: 'outfit',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'outfit-medium',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
    fontFamily: 'outfit-bold',
  },
  ingredientsList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2e7d32',
    marginTop: 8,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    flex: 1,
    fontFamily: 'outfit',
  },
  stepBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 0,
  },
  stepNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    flex: 1,
    fontFamily: 'outfit',
  },
  footerMessage: {
    backgroundColor: '#f0f9f4',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d4f5dd',
  },
  footerText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 16,
  }
});