import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Marquee } from '@animatereactnative/marquee'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useLogto } from '@logto/rn'

export default function Landing() {

    const { signIn, signOut, isAuthenticated } = useLogto();

    const imageList = [
        require('./../assets/images/1.jpg'),
        require('./../assets/images/c1.jpg'),
        require('./../assets/images/2.jpg'),
        require('./../assets/images/c2.jpg'),
        require('./../assets/images/3.jpg'),
        require('./../assets/images/c3.jpg'),
        require('./../assets/images/4.jpg'),
        require('./../assets/images/5.jpg'),
        require('./../assets/images/6.jpg'),
    ]
    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Marquee style={styles.marqueeStyle} spacing={10} speed={0.9}>
                    <View style={styles.smallContainer}>
                        {imageList.map((image: any, index: number) => (
                            <Image
                                key={index}
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                </Marquee>
                <Marquee style={styles.marqueeStyle} spacing={10} speed={0.5}>
                    <View style={styles.smallContainer}>
                        {imageList.map((image: any, index: number) => (
                            <Image
                                key={index}
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                </Marquee>
                <Marquee style={styles.marqueeStyle} spacing={10} speed={-0.7}>
                    <View style={styles.smallContainer}>
                        {imageList.map((image: any, index: number) => (
                            <Image
                                key={index}
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ))}
                    </View>
                </Marquee>
            </View>
            <View style={styles.container2}>
                <Text style={styles.text1}>AI CookBook | Find, Create, Make & Enjoy Delicious Food Recipe's</Text>
                <TouchableOpacity onPress={async () => signIn('exp://192.168.109.156:8081')} style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                {/* <Text style={styles.text2}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text> */}
                <Button title="Sign out" onPress={async () => signOut()} />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 20,
    },
    smallContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 25
    },
    marqueeStyle: {
        transform: [{rotate:'-4deg'}],
        marginTop: 10
    },
    container2: {
        padding: 15,
        backgroundColor: 'white',
        height: '100%'
    },
    text1: {
        fontWeight: 'bold',
        fontFamily: 'outfit',
        fontSize: 25,
        textAlign: 'center'
    },
    text2: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray'
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 15,
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 'semibold'
    }
});