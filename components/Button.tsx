import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';

export default function Button({ label, onPress, iconName = '', loading = false }: any) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            disabled={loading}
            onPress={() => onPress()}
            style={[styles.button, { backgroundColor: colors.primary }]}
        >
            {loading ? (
                <ActivityIndicator color={'white'} />
            ) : (
                <Ionicons name={iconName} size={24} color="white" />
            )}
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 15,
        borderRadius: 15,
        margin: 5,
        elevation: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'outfit-bold',
    }
});