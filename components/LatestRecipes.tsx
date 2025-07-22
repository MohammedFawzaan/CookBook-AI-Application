import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import GlobalApi from '@/services/GlobalApi'
import RecipeCardHome from './RecipeCardHome'

export default function LatestRecipes() {
  const [loading, setLoading] = React.useState(true);
  const [recipeList, setRecipeList] = React.useState([]);

  const GetAllRecipes = async () => {
    try {
      setLoading(true);
      const result = await GlobalApi.GetAllRecipesByLimit(10);
      setRecipeList(result.data.data);
    } catch(error) {
      console.log("Failed to fetch recipes : ", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    GetAllRecipes();
  }, []);

  if(loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Latest Recipes</Text>
      <FlatList
        data={recipeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
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
      // marginTop: 10
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