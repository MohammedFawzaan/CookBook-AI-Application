import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import GlobalApi from '@/services/GlobalApi'
import RecipeCardHome from './RecipeCardHome'
import { useTheme } from '@/context/ThemeContext';
import { useFocusEffect } from 'expo-router';

export default function LatestRecipes() {
  const [loading, setLoading] = React.useState(true);
  const [recipeList, setRecipeList] = React.useState([]);
  const { colors } = useTheme();

  const GetAllRecipes = React.useCallback(async () => {
    try {
      if (recipeList.length === 0) setLoading(true);

      const result = await GlobalApi.GetAllRecipesByLimit(10);
      setRecipeList(result.data.data);
    } catch (error) {
      console.log("Failed to fetch recipes : ", error);
    } finally {
      setLoading(false);
    }
  }, [recipeList.length]);

  useFocusEffect(
    React.useCallback(() => {
      GetAllRecipes();
    }, [GetAllRecipes])
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text1, { color: colors.text }]}>Latest Recipes</Text>
      <FlatList
        data={recipeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <RecipeCardHome recipe={item} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  text1: {
    margin: 10,
    fontSize: 23,
    fontWeight: 'bold'
  },
  loader: {
    padding: 50
  }
});