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
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface product {
  colour: string;
  id: number;
  img: ImageURISource;
  name: string;
  price: number;
  isAdded: boolean;
  count: number;
}

const ImageModal: React.FC = (props: any) => {
  const {imgUrl, visibility, onPressCross} = props;
  return (
    <Modal visible={visibility} transparent={true}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.crossContainer} onPress={onPressCross}>
          <Text style={styles.CrossSize}>X</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imgUrl}}
            style={styles.imageStyle}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  CrossSize: {
    fontSize: 20,
    color: 'white',
  },
  imageContainer: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 600,
    width: 400,
  },
  crossContainer: {flex: 0.05, flexWrap: 'wrap', alignSelf: 'flex-end', marginRight:20, marginTop:40},
});

export default ImageModal;
