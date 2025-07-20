import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';

type Recipe = {
    id?: string | number;
};

export default function RecipeByCategory() {
    const { categoryName } = useLocalSearchParams();
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetRecipeByCategory();
    }, []);

    const GetRecipeByCategory = async () => {
        try {
            setLoading(true);
            const result = await GlobalApi.GetRecipeByCategory(categoryName as string);
            setRecipeList(result?.data?.data || []);
        } catch (err) {
            console.error('Error fetching recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text1}>{categoryName} Recipes</Text>  
        {loading && recipeList.length === 0 ? (
            <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={recipeList}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            numColumns={2}
            refreshing={loading}
            onRefresh={GetRecipeByCategory}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <RecipeCard recipe={item} />
                </View>
            )}
            ListEmptyComponent={
                !loading
                ? (
                    <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
                        No recipes found for "{categoryName}"
                    </Text>
                )
                : null
            }
          />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10
    },
    card: {
        flex: 1,
        margin: 5
    }
});