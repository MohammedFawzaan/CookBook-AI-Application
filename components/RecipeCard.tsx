import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function RecipeCard({ recipe }: any) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/recipe-detail',
          params: {
            recipeData: JSON.stringify(recipe)
          }
        });
      }}
      style={styles.container}>
      {/* <Image 
        source={{uri: recipe?.recipeImage}}
        style={{
            width: '100%',
            height: 220,
            borderRadius: 20
        }}
      /> */}
      <Image
        source={require('../assets/images/NoRecipeImage.png')}
        style={{
          width: '100%',
          height: 220,
          borderRadius: 20
        }}
      />
      <LinearGradient
        style={styles.linearGradient}
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
      >
        <View>
          <Text style={styles.text1} >{recipe?.recipeName}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'semibold'
  }
});