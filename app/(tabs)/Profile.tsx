import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View>
      <Text style={styles.container}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  }
});