import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';

export default function Explore() {
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const GetAllRecipesList = async () => {
    setLoading(true);
    const result = await GlobalApi.GetAllRecipeList();
    const recipes = result.data.data || [];
    setRecipeList(recipes);
    setFilteredRecipes(recipes);
    setLoading(false);
  };

  useEffect(() => {
    GetAllRecipesList();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text) {
      setFilteredRecipes(recipeList);
      return;
    }
    const filtered = recipeList.filter((item: any) => item?.recipeName?.includes(text) );
    setFilteredRecipes(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore</Text>
      <TextInput
        placeholder="Search Recipe's"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredRecipes}
        numColumns={2}
        refreshing={loading}
        onRefresh={() => {
          GetAllRecipesList()
          setSearchQuery('')
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <RecipeCard recipe={item} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading ? (
            <Text style={styles.noResultText}>No recipes found.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 7,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  card: {
    flex: 1,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
  },
});