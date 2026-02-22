import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const Breakfast = require('../assets/images/breakfast.jpeg');
const Lunch = require('../assets/images/lunch.jpeg');
const Salad = require('../assets/images/salad.jpeg');
const Drink = require('../assets/images/drink.png');
const Fastfood = require('../assets/images/fastfood.webp');
const Dinner = require('../assets/images/dinner.jpeg');
const Dessert = require('../assets/images/dessert.png');
const Cake = require('../assets/images/cake.png');

const Categories = [
  { name: 'Breakfast', imageSource: Breakfast },
  { name: 'Lunch', imageSource: Lunch },
  { name: 'Salad', imageSource: Salad },
  { name: 'Drink', imageSource: Drink },
  { name: 'Dinner', imageSource: Dinner },
  { name: 'Dessert', imageSource: Dessert },
  { name: 'Cake', imageSource: Cake },
  { name: 'Fastfood', imageSource: Fastfood },
];

export default function CategoryList() {
  const router = useRouter();
  const { colors } = useTheme();
  const categoryList = Categories;

  return (
    <View>
      <Text style={[styles.heading, { color: colors.text }]}>Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/recipe-by-category',
              params: {
                categoryName: item?.name
              }
            })}
            style={[styles.categoryContainer, { backgroundColor: colors.background }]}>
            <Image
              source={item.imageSource}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
            <Text style={[styles.categoryName, { color: colors.text }]}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    margin: 10,
    fontSize: 23,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  categoryName: {
    marginTop: 3
  },
});