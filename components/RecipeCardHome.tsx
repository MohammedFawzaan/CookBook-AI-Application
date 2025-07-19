import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

export default function RecipeCardHome({ recipe }: any) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: '/recipe-detail',
                    params: {
                        recipeData: JSON.stringify(recipe)
                    }
                });
            }}
            style={styles.container}
        >
            <Image
                source={require('../assets/images/RecipeImage.png')}
                style={{
                    width: 200,
                    height: 140,
                    borderRadius: 20
                }}
            />
            <LinearGradient
                style={styles.linearGradient}
                colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}>
                <View>
                    <Text style={styles.text1} >{recipe?.recipeName}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    text1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'semibold'
    }
});