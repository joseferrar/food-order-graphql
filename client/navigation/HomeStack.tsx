import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from '../screens/Products';
import Details from '../screens/Details';
import {HomeStackNavigatorParamList} from './types';
import Restaurant from '../screens/Restaurant';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Cart from '../screens/Cart';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurant" component={Restaurant} />
      <HomeStack.Screen
        name="Cart"
        component={Cart}
        options={{headerTitle: 'My Cart'}}
      />
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name="Product" component={Product} />

      <HomeStack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
