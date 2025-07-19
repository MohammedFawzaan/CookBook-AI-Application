import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import GlobalApi from '@/services/GlobalApi'
import RecipeCard from '@/components/RecipeCard';

export default function Explore() {
  const [recipeList, setRecipeList] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const GetAllRecipesList = async () => {
    setLoading(true);
    const result = await GlobalApi.GetAllRecipeList();
    setRecipeList(result.data.data);
    setLoading(false);
  }

  React.useEffect(() => {
    GetAllRecipesList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading} >Explore</Text>
      <FlatList
        data={recipeList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetAllRecipesList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
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
    height: '100%',
    marginVertical: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 7
  },
  card: {
      flex: 1
  }
});