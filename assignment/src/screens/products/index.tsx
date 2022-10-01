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
  ImageProps,
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
import {addToCart, fetchProducts, removeFromCart} from '../../states/action';
import ProductCard from '../../common/productCard';
import Loader from '../../common/loader';

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

  const onPressRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const renderItems = (item: product) => {
    return (
     <ProductCard item={item} onPressAddToCart={onPressAddToCart} onPressRemoveFromCart={onPressRemoveFromCart}/>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={states.products ? states.products.response : []}
        renderItem={({item}) => renderItems(item)}
        ListEmptyComponent={()=>{
          if(states.loading) return null
          return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Error Fetching Product List</Text>
          </View>
          )
        }}
      />
      {states.loading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
