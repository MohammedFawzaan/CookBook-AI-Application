import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import GlobalApi from '@/services/GlobalApi'
import { useRouter } from 'expo-router';

export default function CategoryList() {

  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [categoryList, setCategoryList] = React.useState([]);

  React.useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = async () => {
    try {
      setLoading(true);
      const result = await GlobalApi.GetCategory();
      setCategoryList(result?.data?.data);
    } catch(error) {
      console.log("Failed to fetch recipes : ", error);
    } finally {
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }: any) => (
          <TouchableOpacity 
            onPress={() => router.push({
                pathname: '/recipe-by-category',
                params: {
                 categoryName: item?.name
                }
            })}
            style={styles.categoryContainer}>
            <Image source={{ uri: item?.image?.url }} style={{ width: 40, height: 40, borderRadius: 50 }} />
            <Text style={styles.categoryName}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 15
  },
  heading: {
    margin: 10,
    fontSize: 23,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  categoryName: {
    marginTop: 3
  },
  loader: {
    padding: 50
  }
});