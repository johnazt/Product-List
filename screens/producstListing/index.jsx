import {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Context} from '../../context';

export default function ProductsListing() {
  const {products, loading} = useContext(Context);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={'blue'} size={'large'} />
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => <Text>{item.title}</Text>}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
