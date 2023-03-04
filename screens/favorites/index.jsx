import {useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FavoriteItem from '../../components/favoriteItem';
import {Context} from '../../context';

export default function Favorite() {
  const {favoriteItems, handleRemoveFavorite} = useContext(Context);

  if (!favoriteItems.length) {
    return (
      <View style={styles.NoFavorite}>
        <Text style={styles.NoFavoriteText}>No Favorites Add</Text>
      </View>
    );
  }

  return (
    <View style={styles.favoriteMainContainer}>
      <FlatList
        data={favoriteItems}
        renderItem={({item}) => (
          <FavoriteItem
            title={item.title}
            reason={item.reason}
            handleRemoveFavorite={handleRemoveFavorite}
            id={item.id}
          />
        )}
        keyExtractor={itemData => itemData.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteMainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  NoFavorite: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  NoFavoriteText: {
    fontSize: 22,
    color: '#000000',
  },
});
