import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function LoadingDialog({visible=false, text='Loading...'}) {
  return (
    <Modal transparent visible={visible}>
        <View style={styles.overlay}>
            <ActivityIndicator 
                size={'large'}
                color='black'
            />
            <Text style={styles.text1}>{text}</Text>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000070'
    },
    text1: {
        marginTop: 10,
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'outfit'
    }
});