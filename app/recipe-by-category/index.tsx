import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';

type Recipe = {
    id?: string | number;
};

export default function RecipeByCategory() {
    const { categoryName } = useLocalSearchParams();
    const { colors } = useTheme();
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.text1, { color: colors.text }]}>{categoryName} Recipes</Text>
            {loading && recipeList.length === 0 ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
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
                        !loading ?
                            (<Text style={{ textAlign: 'center', marginTop: 50, color: colors.textMuted }}>
                                No recipes found for "{categoryName}"
                            </Text>
                            ) : null
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text1: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10,
        fontFamily: 'outfit-bold'
    },
    card: {
        flex: 1,
        margin: 5
    }
});