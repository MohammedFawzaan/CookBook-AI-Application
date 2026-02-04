import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RecipeDetail() {
  const { recipeData } = useLocalSearchParams();
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : JSON.parse(recipeData[0]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.recipeName}</Text>
      <Image
        source={recipe?.recipeImage && recipe.recipeImage.includes('http')
          ? { uri: recipe?.recipeImage.replace('ai-guru-lab-images/', 'ai-guru-lab-images%2F') }
          : require('./../assets/images/RecipeImage.png')}
        style={{
          width: '100%',
          height: 220,
          borderRadius: 20,
          resizeMode: 'cover'
        }}
      />
      <Text style={styles.description}>{recipe.description}</Text>

      <View style={styles.tags}>
        <Text style={styles.tag}>🔥 {recipe.calories} Cal</Text>
        <Text style={styles.tag}>⏱️ {recipe.cookTime} Min</Text>
        <Text style={styles.tag}>👥 Serves {recipe.serveTo}</Text>
      </View>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients?.map((item: any, index: any) => (
        <Text key={index} style={styles.ingredient}>
          {item.icon} {item.ingredient} - {item.quantity}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Steps</Text>
      {recipe.steps?.map((step: any, index: any) => (
        <View key={index} style={styles.stepBox}>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <View
        style={{
          backgroundColor: '#d4f5dd',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#2e7d32'
          }}>
          😊Recipe is Saved in Your CookBook
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b1b1b',
    margin: 8,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: '#353333ff',
    marginVertical: 15,
    lineHeight: 26,
    fontFamily: 'System',
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#eafaf1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 15,
    color: '#2e7d32',
    fontWeight: '500',
    fontFamily: 'System',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 5,
    color: '#1b1b1b',
    borderBottomWidth: 2,
    borderBottomColor: '#d4f5dd',
    paddingBottom: 4,
    fontFamily: 'System',
  },
  ingredient: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
    lineHeight: 22,
    fontFamily: 'System',
  },
  stepBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f8f5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
    fontFamily: 'System',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontFamily: 'System',
  },
});