import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Button, Card} from 'react-native-paper';
import {useMutation, useQuery} from '@apollo/client';
import {GET_CART, UPDATE_CART} from '../graphql/queries';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart, decreaseCart} from '../features/reducers/cartSlice';

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);
  const {loading, data, error} = useQuery(GET_CART);
  const [addCart, {loading: updating, error: updateError}] = useMutation(
    UPDATE_CART,
    {refetchQueries: [{query: GET_CART}]},
  );
  const Total = cart?.cartItems?.reduce(
    (a: any, c: any) => a + c.cartQuantity * c.price,
    0,
  );

  // async function increment() {
  //   const qtyupdate = {
  //     id: '6315d1c481cb6455d08ff5d',
  //     qty: 5,
  //     product_name: 'item?.product_name',
  //     product_desc: 'item?.product_desc',
  //     price: 88,
  //     imageUrl: 'item?.imageUrl',
  //     restaurant: 'item?.restaurant',
  //   };
  //   console.log(qtyupdate);
  //   updateCart({variables: qtyupdate});
  // }

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    AsyncStorage.setItem('allItems', JSON.stringify(product));
  };

  const handleDecrementToCart = (product: any) => {
    dispatch(decreaseCart(product));
  };
  console.log('cart', Total);
  const proObj = {
    carts: cart?.cartItems,
    total: Total,
  };
  console.log(proObj);
  return (
    <View>
      {cart?.cartItems?.map((item, i) => (
        <Card style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image
              size={80}
              source={{
                uri: item?.imageUrl,
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{item?.product_name}</Text>
            <Button onPress={() => handleAddToCart(item)}>
              <Text style={styles.plus}>+</Text>
            </Button>
            <Text style={styles.title}>{item?.cartQuantity}</Text>
            <Button
              style={{marginTop: 4}}
              onPress={() => handleDecrementToCart(item)}>
              <Text style={styles.minus}>-</Text>
            </Button>
          </View>
          <Text style={styles.price}>$ {item.price}</Text>
        </Card>
      ))}
      <Card style={{marginTop: 50}}>
        <Text style={styles.total}>Total - {Total}</Text>
      </Card>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 350,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    margin: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    margin: 8,
  },
  plus: {
    fontSize: 18,
  },
  minus: {
    fontSize: 28,
  },
  price: {
    textAlign: 'center',
    marginTop: -60,
    marginLeft: -100,
    color: 'green',
    fontWeight: 'bold',
  },
  total: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginTop: 'auto',
  },
});
