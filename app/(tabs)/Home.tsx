import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CreateRecipe from "@/components/CreateRecipe";
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <CreateRecipe />
      {/* <CategoryList /> */}
    </ScrollView>
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