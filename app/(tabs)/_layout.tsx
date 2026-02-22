import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
    const { colors } = useTheme();
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
        }}>
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