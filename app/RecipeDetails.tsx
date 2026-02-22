import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RecipeDetail() {
  const { recipeData } = useLocalSearchParams();
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : JSON.parse(recipeData[0]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={recipe?.recipeImage && (recipe.recipeImage.includes('http') || recipe.recipeImage.startsWith('data:'))
              ? { uri: recipe?.recipeImage.replace('ai-guru-lab-images/', 'ai-guru-lab-images%2F') }
              : require('./../assets/images/RecipeImage.png')}
            style={styles.image}
          />
          {/* Bottom gradient for smooth sheet transition */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.15)', 'rgba(255,255,255,1)']}
            style={styles.bottomGradient}
          />
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
            <Text style={styles.sectionTitle}>🥦 Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients?.map((item: any, index: any) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>
                    {item.icon} {item.ingredient} {item.quantity ? `- ${item.quantity}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Steps */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>👨‍🍳 Instructions</Text>
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
          <LinearGradient
            colors={['#1b5e20', '#2e7d32', '#43a047']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.footerCard}
          >
            <Text style={styles.footerEmoji}>🍽️</Text>
            <Text style={styles.footerTitle}>Enjoy your Meal!</Text>
            <Text style={styles.footerSubtitle}>Crafted with ❤️ by CookBook AI</Text>
          </LinearGradient>

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
    height: 340,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  contentContainer: {
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
    fontFamily: 'outfit-bold',
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 22,
    fontFamily: 'outfit',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 18,
    padding: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    backgroundColor: 'white',
    padding: 9,
    borderRadius: 50,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: { fontSize: 20 },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 3,
    fontFamily: 'outfit',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
    fontFamily: 'outfit-medium',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  sectionContainer: { marginBottom: 26 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 14,
    fontFamily: 'outfit-bold',
  },
  ingredientsList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 7,
    height: 7,
    borderRadius: 4,
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
    marginBottom: 18,
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  stepNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 23,
    flex: 1,
    fontFamily: 'outfit',
  },
  footerCard: {
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  footerEmoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  footerTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
    fontFamily: 'outfit-bold',
    marginBottom: 4,
  },
  footerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontFamily: 'outfit',
  },
});