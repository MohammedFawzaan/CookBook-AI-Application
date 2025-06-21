import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

export default function RecipeDetail() {
  const { data } = useLocalSearchParams();
  const recipe = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data[0]);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Text style={styles.title}>{recipe.recipeName}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>🔥 {recipe.calories} Cal</Text>
          <Text style={styles.tag}>⏱️ {recipe.cookTime} Min</Text>
          <Text style={styles.tag}>👥 Serves {recipe.serveTo}</Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((item: any, index: any) => (
          <Text key={index} style={styles.ingredient}>
            {item.icon} {item.ingredient} - {item.quantity}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Steps</Text>
        {recipe.steps.map((step: any, index: any) => (
          <View key={index} style={styles.stepBox}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 7,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 5,
  },
  description: {
    fontSize: 17,
    fontWeight: 'semibold',
    color: '#555',
    marginVertical: 15,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e2f5e5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 13,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#222',
  },
  ingredient: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  stepBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});