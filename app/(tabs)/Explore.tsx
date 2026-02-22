import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';

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
    const filtered = recipeList.filter((item: any) => item?.recipeName?.toLowerCase().includes(text.toLowerCase()));
    setFilteredRecipes(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Explore</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color={'gray'} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search Recipes..."
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

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
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          !loading ? (
            <Text style={styles.noResultText}>No recipes found.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'outfit-medium',
  },
  card: {
    flex: 1,
    margin: 5,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
    fontFamily: 'outfit',
  },
});