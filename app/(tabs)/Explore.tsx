import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Explore() {
  const { colors } = useTheme();
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
    const filtered = recipeList.filter((item: any) =>
      item?.recipeName?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Explore</Text>

      <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
        <Ionicons name="search" size={22} color={colors.textMuted} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search Recipes..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={handleSearch}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <FlatList
        data={filteredRecipes}
        numColumns={2}
        refreshing={loading}
        onRefresh={() => {
          GetAllRecipesList();
          setSearchQuery('');
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
            <Text style={[styles.noResultText, { color: colors.textMuted }]}>No recipes found.</Text>
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
  },
  heading: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'outfit-medium',
  },
  card: {
    flex: 1,
    margin: 5,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'outfit',
  },
});