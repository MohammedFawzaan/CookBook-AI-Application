import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} >Profile</Text>
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