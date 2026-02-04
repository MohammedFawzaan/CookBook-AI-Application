import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateRecipe from "@/components/CreateRecipe";
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import LatestRecipes from '@/components/LatestRecipes';

export default function Home() {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <Header />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <CreateRecipe />
          <CategoryList />
          <LatestRecipes />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
  },
  contentContainer: {
    paddingHorizontal: 10,
  }
});