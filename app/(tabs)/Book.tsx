import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Book() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} >Your CookBook</Text>
      {/* <FlatList
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
      /> */}
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