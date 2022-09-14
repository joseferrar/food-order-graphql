import {View, Text, StyleSheet, Alert, ToastAndroid} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {HomeScreenNavigationProp} from '../navigation/types';
import {ADD_CART, GET_PRODUCT} from '../graphql/queries';
import useAuth from '../hooks/useAuth';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useQuery, useMutation} from '@apollo/client';
import ProductList from '../components/Lists/ProductList';
import ProductCard from '../components/Cards/ProductCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {addToCart} from '../features/reducers/cartSlice';

const Product = ({navigation, route}: HomeScreenNavigationProp) => {
  const {user}: any = useAuth();
  const {params}: any = route;
  const {loading, data} = useQuery(GET_PRODUCT);
  const [addCart, {error}] = useMutation(ADD_CART);
  console.log('that user', data);

  const dd = user ? 'hello' : 'no';
  console.log(dd);
  console.log(error);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="shopping-cart"
              size={30}
              color="#000"
              onPress={() => navigation.navigate('Cart')}
            />
          </View>
        </>
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <View style={{marginTop: 10}}>
      <ProductList
        refreshing={loading}
        data={data?.products}
        renderItem={({item}) =>
          params?.name === item?.restaurant && (
            <ProductCard
              onPress={() => navigation.navigate('Details', item)}
              title={item?.product_name}
              description={item?.description}
              image={item?.imageUrl}
              price={item?.price}
              action={'Add to Cart'}
              LongPress={async () => {
                if (!user) {
                  Alert.alert('your must be login');
                } else {
                  // var addData = {
                  //   product_name: item?.product_name,
                  //   product_desc: item?.product_desc,
                  //   price: item?.price,
                  //   imageUrl: item?.imageUrl,
                  //   restaurant: item?.restaurant,
                  // };
                  // await addCart({variables: {cartInput: addData}});
                  // addToCart(addData);
                  handleAddToCart(item);
                }
              }}
            />
          )
        }
      />
    </View>
  );
};

export default Product;
