import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Button({ label, onPress, iconName='', loading=false }: any) {
    return (
        <TouchableOpacity disabled={loading} onPress={() => onPress()} style={styles.button}>
            {loading? <ActivityIndicator color={'white'} /> : <Ionicons name={iconName} size={24} color="white" />}
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 15,
        margin: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    }
});