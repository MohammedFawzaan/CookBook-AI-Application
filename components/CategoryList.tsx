import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import GlobalApi from '@/services/GlobalApi'

export default function CategoryList() {

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
      {/* <Text style={styles.heading}>Category</Text> */}
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }: any) => (
          <View style={styles.categoryContainer}>
            <Image source={{ uri: item?.image?.url }} style={{ width: 40, height: 40 }} />
            <Text style={styles.categoryName}>{item?.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  heading: {
    fontSize: 20,
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