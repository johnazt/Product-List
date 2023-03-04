import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Button,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import ProductsDetailItem from '../../components/productsDetailItem';
import {Context} from '../../context';

export default function ProductsDetails() {
  const {addToFavorite, favoriteItems} = useContext(Context);
  const route = useRoute();
  const productId = route.params.productId;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [productDetailsData, setProductDetailsData] = useState([]);

  useEffect(() => {
    async function getItemDetailsData() {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
      const data = await response.json();
      if (data) {
        setLoading(false);
        setProductDetailsData(data);
      }
    }
    getItemDetailsData();
  }, []);

  const currentItemIsPresentInFavorite =
    favoriteItems && favoriteItems.length > 0
      ? favoriteItems.filter(item => item.id === productId)
      : false;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            onPress={() => setModalVisible(true)}
            title={
              currentItemIsPresentInFavorite &&
              currentItemIsPresentInFavorite.length > 0
                ? 'Update Favorite'
                : 'Add Favorites'
            }
          />
        );
      },
    });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={'red'} size={'large'} />
    );
  }

  const handleTextInput = enteredText => {
    setReason(enteredText);
  };

  return (
    <View>
      <ProductsDetailItem productDetailsData={productDetailsData} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              placeholder="Why do you like this product?"
              maxLength={40}
              onChangeText={handleTextInput}
              value={reason}
            />
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  addToFavorite(productId, reason);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>
                  {currentItemIsPresentInFavorite &&
                  currentItemIsPresentInFavorite.length > 0
                    ? 'Update'
                    : 'Add'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginRight: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
