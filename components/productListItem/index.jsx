import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function ProductListItem({title, onPress, bgColor}) {
  return (
    <View style={styles.productItemContainer}>
      <Pressable
        android_ripple={{
          color: '#ced434',
        }}
        onPress={onPress}
        style={{...styles.pressableView, backgroundColor: bgColor}}>
        <View style={styles.productItemInner}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    margin: 16,
    height: 160,
  },
  pressableView: {
    flex: 1,
    borderRadius: 8,
  },
  productItemInner: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
});
