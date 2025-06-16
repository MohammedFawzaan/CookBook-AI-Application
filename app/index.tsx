import { useLogto } from '@logto/rn';
import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useState, useEffect } from 'react';
// import CreateRecipe from "@/components/CreateRecipe";

export default function Index() {
  const { getIdTokenClaims, isAuthenticated } = useLogto();
  // const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((userData) => {
        // setUser(userData);
        console.log(userData);
      });
    }
  }, [isAuthenticated]);

  return (
    <View
      style={styles.container}>
      <Redirect href={'/Landing'} />
      {/* <CreateRecipe /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});