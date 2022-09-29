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
import {addToCart, fetchProducts} from '../states/action';

interface product {
  colour: string;
  id: number;
  img: ImageURISource;
  name: string;
  price: number;
  isAdded: boolean;
  count: number;
}

const Products: React.FC = () => {
  const states: any = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
      if(!states.products){
        dispatch(fetchProducts())
      } else if(states.products && states.products.length == 0){
        dispatch(fetchProducts());
      }
  }, []);

  const onPressAddToCart = (id: number) => {
    dispatch(addToCart(id));
  };

  const renderItems = (item: product) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{url: item.img}} style={styles.imageStyle} />
        <View style={{flex: 0.4, marginLeft: 10}}>
          <View style={styles.contentView}>
            <Text>Name: </Text>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.contentView}>
            <Text>Colour: </Text>
            <Text>{item.colour}</Text>
          </View>
          <View style={styles.contentView}>
            <Text>Price: </Text>
            <Text>{item.price}</Text>
          </View>
          <TouchableOpacity
            disabled={item.isAdded}
            onPress={() => onPressAddToCart(item.id)}
            style={[styles.button, {opacity: item.isAdded ? 0.5 : 1}]}>
            <Text>{item.isAdded ? 'Added To Cart' : 'Add To Cart'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={states.products ? states.products.response : []}
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
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imageStyle: {
    height: 300,
    flex: 0.5,
  },
  contentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Products;
