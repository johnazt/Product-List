import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function FavoriteItem({
  title,
  reason,
  handleRemoveFavorite,
  id,
}) {
  return (
    <View style={styles.favoriteItemContainer}>
      <Pressable onPress={() => handleRemoveFavorite(id)}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{reason}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteItemContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#0f0782',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
