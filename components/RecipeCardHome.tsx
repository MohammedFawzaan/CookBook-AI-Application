import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

export default function RecipeCardHome({ recipe }: any) {
    const router = useRouter();
    const [imageLoading, setImageLoading] = useState(true);

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
            <View>
                <Image
                    source={recipe?.recipeImage && (recipe.recipeImage.includes('http') || recipe.recipeImage.startsWith('data:'))
                        ? { uri: recipe?.recipeImage.replace('ai-guru-lab-images/', 'ai-guru-lab-images%2F') }
                        : require('./../assets/images/RecipeImage.png')}
                    style={{
                        width: 200,
                        height: 140,
                        borderRadius: 20,
                        resizeMode: 'cover'
                    }}
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                />
                {imageLoading && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color="#2e7d32" />
                    </View>
                )}
            </View>
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
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        overflow: 'hidden'
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