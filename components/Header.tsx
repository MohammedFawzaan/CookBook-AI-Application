import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import React, { useState } from 'react';

export default function Header() {
  const [ isEnabled, setIsEnabled ] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image style={styles.image} source={require('./../assets/images/cookbooklogo.png')} />
        <Text style={styles.text1}>CookBook AI</Text>
      </View>
      <View style={styles.container2}>
        <Text>{isEnabled? "Veg" : "Non-Veg"}</Text>
        <Switch 
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
      {/* <View style={styles.line} /> */}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50
  },
  text1: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    height: 3,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 5,
    borderRadius: 2
  }
});