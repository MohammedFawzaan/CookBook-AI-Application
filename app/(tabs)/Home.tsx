import { ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import CreateRecipe from "@/components/CreateRecipe";
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import LatestRecipes from '@/components/LatestRecipes';

export default function Home() {
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <ScrollView style={styles.container}>
        <Header />
        <CreateRecipe />
        <CategoryList />
        <LatestRecipes />
      </ScrollView>
      }
    />
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