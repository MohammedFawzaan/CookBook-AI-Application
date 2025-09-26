import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useClerkAuth } from '@/hooks/useClerkAuth'

export default function Landing() {
    const imageList = [
        require('./../assets/images/1.jpg'),
        require('./../assets/images/2.jpg'),
        require('./../assets/images/c1.jpg'),
        require('./../assets/images/3.jpg'),
        require('./../assets/images/4.jpg'),
        require('./../assets/images/c2.jpg'),
        require('./../assets/images/5.jpg'),
        require('./../assets/images/6.jpg'),
        require('./../assets/images/c3.jpg'),
    ]

    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { loading, handleAuth } = useClerkAuth()

    // Animated values for horizontal scrolling
    const scrollX1 = useRef(new Animated.Value(0)).current
    const scrollX2 = useRef(new Animated.Value(0)).current
    const scrollX3 = useRef(new Animated.Value(0)).current

    const imageWidth = 160 // image width + margin
    const totalWidth = imageWidth * imageList.length

    // Function to create infinite scroll animation
    const createScrollAnimation = (animatedValue: Animated.Value, speed: number) => {
        animatedValue.setValue(0)
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: totalWidth,
                duration: totalWidth * speed,
                useNativeDriver: true,
                isInteraction: false,
            })
        ).start()
    }

    useEffect(() => {
        createScrollAnimation(scrollX1, 10)
        createScrollAnimation(scrollX2, 40)
        createScrollAnimation(scrollX3, 10)
    }, [])

    const renderMarquee = (animatedValue: Animated.Value, reverse = false) => (
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, totalWidth],
                outputRange: reverse ? [ -totalWidth, 0 ] : [0, -totalWidth],
              }),
            },
          ],
        }}>
        {imageList.concat(imageList).map((img, i) => (
      <Image key={i} source={img} style={styles.image} />
    ))}
  </Animated.View>
)


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.marqueeStyle, { transform: [{ rotate: '-4deg' }] }]}>
                    {renderMarquee(scrollX1, true)}
                </View>
                <View style={[styles.marqueeStyle, { transform: [{ rotate: '-4deg' }] }]}>
                    {renderMarquee(scrollX2)}
                </View>
                <View style={[styles.marqueeStyle, { transform: [{ rotate: '-4deg' }] }]}>
                    {renderMarquee(scrollX3)}
                </View>
            </View>

            <View style={styles.container2}>
                <Text style={styles.text1}>
                    AI CookBook | Find, Create, Make & Enjoy Delicious Food Recipe's
                </Text>
                {isSignedIn ? (
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/Home')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Welcome Back</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={async () => {
                            await handleAuth('oauth_google')
                            router.push('/(tabs)/Home')
                        }}
                        style={styles.button}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.text2}>Made with Mohammed Fawzaan &#x2665;.</Text>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 25,
        marginRight: 10,
    },
    marqueeStyle: {
        marginTop: 10,
        overflow: 'hidden',
    },
    container2: {
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
    },
    text1: {
        fontWeight: 'bold',
        fontFamily: 'outfit',
        fontSize: 25,
        textAlign: 'center',
    },
    text2: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
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
        fontWeight: '600',
    },
})

// Previously commented out code - dont delete.
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Marquee } from '@animatereactnative/marquee'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import { useRouter } from 'expo-router'
// import { useAuth } from '@clerk/clerk-expo'
// import { useClerkAuth } from '@/hooks/useClerkAuth'

// export default function Landing() {
//     const imageList = [
//         require('./../assets/images/1.jpg'),
//         require('./../assets/images/2.jpg'),
//         require('./../assets/images/c1.jpg'),
//         require('./../assets/images/3.jpg'),
//         require('./../assets/images/4.jpg'),
//         require('./../assets/images/c2.jpg'),
//         require('./../assets/images/5.jpg'),
//         require('./../assets/images/6.jpg'),
//         require('./../assets/images/c3.jpg'),
//     ]
//     const router = useRouter();
//     const { isSignedIn } = useAuth();
//     const { loading, handleAuth } = useClerkAuth();
//     return (
//         <GestureHandlerRootView>
//             <View style={styles.container}>
//                 <Marquee style={styles.marqueeStyle} spacing={10} speed={0.9}>
//                     <View style={styles.smallContainer}>
//                         {imageList.map((image: any, index: number) => (
//                             <Image
//                                 key={index}
//                                 source={image}
//                                 style={styles.image}
//                                 resizeMode="cover"
//                             />
//                         ))}
//                     </View>
//                 </Marquee>
//                 <Marquee style={styles.marqueeStyle} spacing={10} speed={0.5}>
//                     <View style={styles.smallContainer}>
//                         {imageList.map((image: any, index: number) => (
//                             <Image
//                                 key={index}
//                                 source={image}
//                                 style={styles.image}
//                                 resizeMode="cover"
//                             />
//                         ))}
//                     </View>
//                 </Marquee>
//                 <Marquee style={styles.marqueeStyle} spacing={10} speed={-0.7}>
//                     <View style={styles.smallContainer}>
//                         {imageList.map((image: any, index: number) => (
//                             <Image
//                                 key={index}
//                                 source={image}
//                                 style={styles.image}
//                                 resizeMode="cover"
//                             />
//                         ))}
//                     </View>
//                 </Marquee>
//             </View>
//             <View style={styles.container2}>
//                 <Text style={styles.text1}>AI CookBook | Find, Create, Make & Enjoy Delicious Food Recipe's</Text>
//                 {isSignedIn ? (
//                     <TouchableOpacity onPress={() => router.push('/(tabs)/Home')} style={styles.button}>
//                         <Text style={styles.buttonText}>Welcome Back</Text>
//                     </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity
//                         onPress={async () => {
//                             await handleAuth('oauth_google');
//                             router.push('/(tabs)/Home');
//                         }}
//                         style={styles.button}
//                         disabled={loading}>
//                         <Text style={styles.buttonText}>
//                             {loading ? 'Signing In...' : 'Sign In'}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//                 <Text style={styles.text2}>Made with Mohammed Fawzaan &#x2665;.</Text>
//             </View>
//         </GestureHandlerRootView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 10,
//         padding: 20,
//     },
//     smallContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         gap: 10
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 25
//     },
//     marqueeStyle: {
//         transform: [{ rotate: '-4deg' }],
//         marginTop: 10
//     },
//     container2: {
//         padding: 15,
//         backgroundColor: 'white',
//         height: '100%'
//     },
//     text1: {
//         fontWeight: 'bold',
//         fontFamily: 'outfit',
//         fontSize: 25,
//         textAlign: 'center'
//     },
//     text2: {
//         textAlign: 'center',
//         fontSize: 18,
//         color: 'gray'
//     },
//     button: {
//         backgroundColor: 'green',
//         padding: 15,
//         borderRadius: 15,
//         margin: 10,
//     },
//     buttonText: {
//         textAlign: 'center',
//         color: 'white',
//         fontSize: 17,
//         fontWeight: 'semibold'
//     }
// });