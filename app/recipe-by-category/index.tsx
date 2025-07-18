import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';

export default function RecipeByCategory() {
  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = React.useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    GetRecipeByCategory();
  }, []);

  // fetch recipes by category
  const GetRecipeByCategory = async () => {
    setLoading(true);
    const result = await GlobalApi.GetRecipeByCategory(categoryName as string);
    console.log(result.data.data);
    setRecipeList(result?.data?.data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1} >{categoryName} Recipes</Text>
      <FlatList 
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetRecipeByCategory}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
            <View style={styles.card}>
                <RecipeCard recipe={item} />
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        height: '100%'
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 25
    },
    card: {
        flex: 1
    }
});