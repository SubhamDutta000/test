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
import { Provider, useSelector, useDispatch } from 'react-redux';
import Cart from './src/cart';
import Products from './src/products';
import { toggleScreen } from './src/states/action';
import store from './src/store';

const Section: React.FC = (props) => {
  const states: any = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();

  const changeScreen = () => {
    dispatch(toggleScreen())
  }
  
  return (
    <View style={{flex:1}}>
       <TouchableOpacity style={styles.cart} onPress={changeScreen}>
            <Text>{states.showCart?'PRODUCT':'CART'}</Text>
        </TouchableOpacity>
        {states.showCart? <Cart/> :<Products />}
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
  cart:{
    backgroundColor:'yellow',
    borderWidth:1,
    alignSelf:'flex-end',
    marginRight:20,
    paddingHorizontal:20,
    paddingVertical:5,
    marginTop:40
}
});

export default App;
