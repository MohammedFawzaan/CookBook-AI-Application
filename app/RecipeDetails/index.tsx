import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function RecipeDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipe Details</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});