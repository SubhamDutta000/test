/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  FlatList,
  Image,
  ImageURISource,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {addToCart, fetchProducts, increaseCount} from '../states/action';

interface product {
  colour: string;
  id: number;
  img: ImageURISource;
  name: string;
  price: number;
  isAdded: boolean;
  count: number;
}

const Cart: React.FC = () => {
  const states: any = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();

  const updateCount = (id: number, shouldAdd: boolean) => {
    dispatch(increaseCount(id, shouldAdd));
  };

  const renderItems = (item: product) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.contentView}>
          <Text>Name: </Text>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.contentView}>
          <Text>Price: </Text>
          <Text>{item.price}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            disabled={item.count <= 0}
            style={[styles.buttons, {opacity: item.count <= 0 ? 0.5 : 1}]}
            onPress={() => updateCount(item.id, false)}>
            <Text style={{color: 'white'}}>-</Text>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>{item.count}</Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => updateCount(item.id, true)}>
            <Text style={{color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={
          states.products
            ? states.products.response.filter((item: product) => item.isAdded)
            : []
        }
        renderItem={({item}) => renderItems(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 40,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  contentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    backgroundColor: 'blue',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});

export default Cart;
