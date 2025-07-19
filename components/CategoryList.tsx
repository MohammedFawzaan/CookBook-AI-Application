import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalApi from '@/services/GlobalApi'
import { useRouter } from 'expo-router';

export default function CategoryList() {

  const router = useRouter();

  // const [loading, setLoading] = React.useState();
  const [categoryList, setCategoryList] = React.useState([]);

  React.useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = async () => {
    const result = await GlobalApi.GetCategory();
    // console.log(result.data.data);
    setCategoryList(result?.data?.data);
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
            <Image source={{ uri: item?.image?.url }} style={{ width: 40, height: 40 }} />
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
  }
});