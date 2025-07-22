import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/Landing');
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    if (!isSignedIn) {
        return null; // Wait for redirect
    }

    return (
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
    );
}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    }
});