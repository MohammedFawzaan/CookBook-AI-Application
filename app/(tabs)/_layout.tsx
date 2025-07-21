import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import ProtectedRoute from '../../components/ProtectedRoute';

export default function TabLayout() {
    return (
        <ProtectedRoute>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="Home"
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Image source={require('./../../assets/images/i1.png')}
                                style={[styles.image, { opacity: focused ? 1 : 0.3 }]}
                            />
                    }} />
                <Tabs.Screen name="Explore"
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Image source={require('./../../assets/images/i2.png')}
                                style={[styles.image, { opacity: focused ? 1 : 0.3 }]}
                            />
                    }} />
                <Tabs.Screen name="Book"
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Image source={require('./../../assets/images/i3.png')}
                                style={[styles.image, { opacity: focused ? 1 : 0.3 }]}
                            />
                    }} />
                <Tabs.Screen name="Profile"
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <Image source={require('./../../assets/images/i4.png')}
                                style={[styles.image, { opacity: focused ? 1 : 0.3 }]}
                            />
                    }} />
            </Tabs>
        </ProtectedRoute>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    }
});