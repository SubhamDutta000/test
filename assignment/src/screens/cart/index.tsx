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
import {addToCart, fetchProducts, increaseCount, removeFromCart} from '../../states/action';
import ProductCard from '../../common/productCard'
import { emptyList } from '../../images';

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

  const onPressAddToCart = (id: number) => {
    dispatch(addToCart(id));
  };

  const onPressRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };


  const renderItems = (item: product) => {
    return (
     <ProductCard item={item} onPressAddToCart={onPressAddToCart} onPressRemoveFromCart={onPressRemoveFromCart} isCartShowing={true}/>
    );
  };

  const calculateTotalItem = () =>{
    let count: number = 0 
    filterData().map((item:product) =>{
      count = count + item.count
    })
    return count
  }

  const calculateTotalPrice = () =>{
    let Price: number = 0 
    filterData().map((item:product) =>{
      Price = Price + (item.count * item.price)
    })
    return Price.toFixed(2)
  }

  const renderTotal = () => {
    return(
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerItem}>
          <Text>Total Unique Item: </Text>
          <Text>{filterData().length} </Text>
        </View>
        <View style={styles.bottomContainerItem}>
          <Text>Total Number Of Item: </Text>
          <Text>{calculateTotalItem()} </Text>
        </View>
        <View style={styles.bottomContainerItem}>
          <Text>Total Price: </Text>
          <Text>$ {calculateTotalPrice()} </Text>
        </View>
      </View>
    )
  }

  const filterData = () =>{
    return states.products
    ? states.products.response.filter((item: product) => item.count > 0)
    : []
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={filterData()}
        renderItem={({item}) => renderItems(item)}
        contentContainerStyle={{paddingBottom:90}}
        ListEmptyComponent={()=>{
          return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
              <Image source={emptyList} style={styles.emptyImage} resizeMode={'contain'}/>
              <Text style={{fontSize:20, fontWeight:'bold'}}>Looks Like Your Cart Is Empty</Text>
            </View>
          )
        }}
      />
      {renderTotal()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  bottomContainer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: 'rgba(0, 24, 106, 0.18)',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingBottom: 25,
    paddingTop:16
  },
  bottomContainerItem:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  emptyImage:{
    height:400,
    width:200
  }
});

export default Cart;
