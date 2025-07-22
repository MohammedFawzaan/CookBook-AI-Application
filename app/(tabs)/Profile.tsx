import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/Landing');
    } catch (err) {
      console.log('Sign out error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👋 {user?.fullName || 'Guest'}</Text>
      <View style={styles.mainContainer}>
        <Image source={{ uri: user?.imageUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <Text style={styles.title}>{user?.primaryEmailAddress?.emailAddress}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10
  },
  title: {
    fontSize: 18,
    margin: 10,
  },
  button: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});