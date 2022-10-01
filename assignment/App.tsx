/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider, useSelector, useDispatch} from 'react-redux';
import Cart from './src/screens/cart';
import Products from './src/screens/products';
import {toggleScreen} from './src/states/action';
import store from './src/store';
import {cartIcon, back} from './src/images';

const Section: React.FC = props => {
  const states: any = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();

  const changeScreen = (showingCart: boolean) => {
    dispatch(toggleScreen(showingCart));
  };

  const filterData = () =>{
    return states.products
    ? states.products.response.filter((item: any) => item.count > 0)
    : []
  }

  const renderCartHeader = () => {
    return (
      <View style={styles.header}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          {states.showCart && <TouchableOpacity  onPress={()=>changeScreen(false)}>
            <Image
              source={back}
              style={styles.backIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>}
          <Text style={styles.cartHeaderText}>{states.showCart ? 'Cart Details': 'Product Details'}</Text>
        </View>
        {!states.showCart && <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={()=>changeScreen(true)}>
          <Image
            source={cartIcon}
            style={[styles.cartIcon,{tintColor: filterData().length > 0? 'green':'black'}]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor:'white'}}>
      {renderCartHeader()}
      {states.showCart ? <Cart /> : <Products />}
      {/* <Products/> */}
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Section />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  cartIcon: {
    width: 20,
    height: 20,
  },
  backIcon: {
    width: 40,
    height: 20,
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    paddingRight: 20,
    marginTop: 40,
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    paddingBottom:10
  },
  cartHeaderText:{
    fontSize:20,
    fontWeight:'600',
    marginLeft:10
  }

});

export default App;
