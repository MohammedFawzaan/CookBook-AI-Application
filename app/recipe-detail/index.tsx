import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';

export default function RecipeDetail() {
    const { recipeData } = useLocalSearchParams();
    const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : JSON.parse(recipeData[0]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#2e7d32'
                    }}>
                    😊 Enjoy your Meal
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 200
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 5,
    },
    description: {
        fontSize: 20,
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
        fontSize: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: '#222',
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 7,
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