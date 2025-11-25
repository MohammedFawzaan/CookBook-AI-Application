import { ScrollView, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CreateRecipe from "@/components/CreateRecipe";
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import LatestRecipes from '@/components/LatestRecipes';
import { useUser } from "@clerk/clerk-expo";

export default function Home() {
  const { user } = useUser();
  console.log("Clerk User Email:", user?.primaryEmailAddress?.emailAddress);

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