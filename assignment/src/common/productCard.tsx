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
import ImageModal from './imageModal';
import {increaseCount} from '../states/action';

interface product {
  colour: string;
  id: number;
  img: ImageURISource;
  name: string;
  price: number;
  isAdded: boolean;
  count: number;
}

const ProductCard: React.FC = (props: any) => {
  const [showFullImage, setShowFullImage] = useState(false);
  const item: product = props.item;

  const onPressButton = () => {
    if (item.count > 0) {
      props.onPressRemoveFromCart(item.id);
    } else {
      props.onPressAddToCart(item.id);
    }
  };

  const dispatch = useDispatch();

  const updateCount = (id: number, shouldAdd: boolean) => {
    dispatch(increaseCount(id, shouldAdd));
  };

  const renderCounters = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>Selected Quantity: </Text>
        <TouchableOpacity
          disabled={item.count <= 1}
          style={[styles.buttons, {opacity: item.count <= 1 ? 0.5 : 1}]}
          onPress={() => updateCount(item.id, false)}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 20}}>{item.count}</Text>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => updateCount(item.id, true)}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.itemContainer,
        {paddingVertical: props.isCartShowing ? 10 : 0},
      ]}>
      {!props.isCartShowing && (
        <TouchableOpacity onPress={() => setShowFullImage(true)}>
          <Image
            source={{url: item.img}}
            style={styles.imageStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      <View style={{flex: 0.7, marginLeft: 10}}>
        <View style={styles.contentView}>
          <Text>Name: </Text>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.contentView}>
          <Text>Colour: </Text>
          <Text>{item.colour}</Text>
        </View>
        <View style={styles.contentView}>
          <Text>Price: $ </Text>
          <Text>{item.price}</Text>
        </View>
        {props.isCartShowing && renderCounters()}
        <TouchableOpacity
          onPress={onPressButton}
          style={[styles.button, {opacity: item.isAdded ? 0.5 : 1}]}>
          <Text>{item.count > 0 ? 'Remove From Cart' : 'Add To Cart'}</Text>
        </TouchableOpacity>
        {showFullImage && (
          <ImageModal
            visibility={showFullImage}
            onPressCross={() => setShowFullImage(false)}
            imgUrl={item.img}
          />
        )}
      </View>
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
    shadowColor: 'rgba(0, 24, 106, 0.18)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageStyle: {
    height: 150,
    width: 150,
    flex: 0.3,
    borderRadius: 999,
  },
  contentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttons: {
    backgroundColor: 'blue',
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:999
  },
  counterText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

export default ProductCard;
