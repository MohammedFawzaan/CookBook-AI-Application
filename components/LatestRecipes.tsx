import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import GlobalApi from '@/services/GlobalApi'
import RecipeCardHome from './RecipeCardHome';

export default function LatestRecipes() {
  const [recipeList, setRecipeList] = React.useState([]);

  const GetAllRecipes = async () => {
    const result = await GlobalApi.GetAllRecipesByLimit(10);
    console.log(result.data.data);
    setRecipeList(result.data.data);
  }

  React.useEffect(() => {
    GetAllRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>LatestRecipes</Text>
      <FlatList
        data={recipeList}
        horizontal={true}
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
    }
});