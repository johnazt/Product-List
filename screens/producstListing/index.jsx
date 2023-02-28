import {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ProductListItem from '../../components/productListItem';
import {Context} from '../../context';
import {useNavigation} from '@react-navigation/native';

const randomColor = () => {
  let letters = '0123456789ABCDEF';
  let colors = '#';
  for (let i = 0; i < 6; i++) {
    colors += letters[Math.floor(Math.random() * 16)];
  }
  return colors;
};

export default function ProductsListing() {
  const {products, loading} = useContext(Context);
  const navigation = useNavigation();

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={'blue'} size={'large'} />
    );
  }

  const handleOnPress = id => {
    navigation.navigate('productDetails', {
      productId: id,
    });
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductListItem
            title={item.title}
            bgColor={randomColor()}
            onPress={() => handleOnPress(item.id)}
          />
        )}
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
