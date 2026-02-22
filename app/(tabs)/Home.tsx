import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateRecipe from "@/components/CreateRecipe";
import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import LatestRecipes from '@/components/LatestRecipes';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.headerWrapper, { backgroundColor: colors.background, borderBottomColor: colors.headerBorder }]}>
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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});