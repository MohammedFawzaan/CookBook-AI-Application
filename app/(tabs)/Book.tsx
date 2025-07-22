import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/services/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import RecipeCard from '@/components/RecipeCard'

export default function Book() {
  const { user } = useUser();

  const [recipeList, setRecipeList] = React.useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetUserRecipeList();
  }, [user]);

  const GetUserRecipeList = async () => {
    setLoading(true);
    const result = await GlobalApi.GetUserCreatedRecipe(user?.primaryEmailAddress?.emailAddress || "");
    setRecipeList(result.data.data);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading} >CookBook</Text>
      {loading && recipeList.length === 0 ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={recipeList}
          numColumns={2}
          refreshing={loading}
          onRefresh={GetUserRecipeList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <RecipeCard recipe={item} />
            </View>
          )}
          ListEmptyComponent={
            !loading ? (
              <View>
                <Text style={{
                  fontWeight: 'normal',
                  fontSize: 16,
                  textAlign: 'center'
                }}>The Recipe's which you have created display's here</Text>
                <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
                  You haven't created any recipe yet!
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10
  },
  card: {
    flex: 1
  }
});