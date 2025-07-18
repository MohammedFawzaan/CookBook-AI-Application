import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import GlobalApi from '@/services/GlobalApi';
import RecipeCard from '@/components/RecipeCard';

export default function RecipeByCategory() {

  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = React.useState([]);

  React.useEffect(() => {
    GetRecipeByCategory();
  }, []);

  // fetch recipes by category
  const GetRecipeByCategory = async () => {
    const result = await GlobalApi.GetRecipeByCategory(categoryName as string);
    console.log(result.data.data);
    setRecipeList(result?.data?.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1} >Browse {categoryName} Recipes</Text>
      <FlatList 
        data={recipeList}
        numColumns={2}
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
        padding: 20,
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