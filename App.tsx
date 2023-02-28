import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import Favorite from './screens/favorites';
import ProductsListing from './screens/producstListing';
import ProductsDetails from './screens/productsDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductContext from './context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{title: 'Products List'}}
        name="ProductsListing"
        component={ProductsListing}
      />
      <Tab.Screen
        options={{title: 'Favorite'}}
        name="Favorite"
        component={Favorite}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <ProductContext>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
              },
              contentStyle: {
                backgroundColor: '#643a71',
              },
            }}>
            <Stack.Screen
              options={{headerShown: false}}
              name="BottomsTab"
              component={BottomTabs}
            />
            <Stack.Screen
              options={{title: 'Product Details'}}
              name="productDetails"
              component={ProductsDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    color: 'black',
    marginVertical: 10,
  },
});

export default App;
