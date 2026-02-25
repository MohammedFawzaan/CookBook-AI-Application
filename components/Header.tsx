import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.container1}>
        <Image style={styles.image} source={require('./../assets/images/icon.png')} />
        <Text style={[styles.text1, { color: colors.text }]}>CookBook AI</Text>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeToggle, { backgroundColor: isDark ? '#2a2a2a' : '#f0f4f0', borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={18}
            color={isDark ? '#fbbf24' : '#4b5563'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  text1: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'outfit-bold',
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});