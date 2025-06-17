import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CategoryList() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});