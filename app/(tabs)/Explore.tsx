import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Explore() {
  const { colors } = useTheme();
  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const GetAllRecipesList = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setLoading(true);
        setHasMore(true);
      } else {
        setIsFetchingMore(true);
      }

      const currentStart = isRefresh ? 0 : start;
      const result = await GlobalApi.GetAllRecipeList(currentStart, limit);
      const recipes = result?.data?.data || [];

      if (recipes.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (isRefresh) {
        setRecipeList(recipes);
        if (searchQuery.trim() !== '') {
          const filtered = recipes.filter((item: any) =>
            item?.recipeName?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredRecipes(filtered);
        } else {
          setFilteredRecipes(recipes);
        }
        setStart(recipes.length);
      } else {
        const newList = [...recipeList, ...recipes];
        setRecipeList(newList);

        if (searchQuery.trim() !== '') {
          const filtered = newList.filter((item: any) =>
            item?.recipeName?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredRecipes(filtered);
        } else {
          setFilteredRecipes(newList);
        }
        setStart(prev => prev + recipes.length);
      }
    } catch (error) {
      console.error("Explore Fetch Error:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }, [start, recipeList, searchQuery]);

  React.useEffect(() => {
    GetAllRecipesList(true);
  }, []);

  const loadMore = () => {
    if (!loading && !isFetchingMore && hasMore) {
      GetAllRecipesList(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text || text.trim() === '') {
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

      {loading && recipeList.length === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredRecipes}
          numColumns={2}
          refreshing={loading}
          onRefresh={() => {
            setSearchQuery('');
            GetAllRecipesList(true);
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <RecipeCard recipe={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 20 }} />
            ) : null
          }
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.noResultText, { color: colors.textMuted, marginBottom: 10 }]}>
                  {recipeList.length === 0 ? "Having trouble connecting to the kitchen..." : "No recipes match your search."}
                </Text>
                <TouchableOpacity
                  onPress={() => GetAllRecipesList(true)}
                  style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 10 }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Try Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
    margin: 10,
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