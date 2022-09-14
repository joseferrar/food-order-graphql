import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_RESTAURANT} from '../graphql/queries';
import RestaurantCard from '../components/Cards/RestaurantCard';
import {HomeScreenNavigationProp} from '../navigation/types';
import {DarkButton, RadiusButton} from '../components/Buttons/Buttons';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Restaurant = ({navigation}: HomeScreenNavigationProp) => {
  const {user}: any = useAuth();
  const {data} = useQuery(GET_RESTAURANT);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <>
          {user ? (
            <RadiusButton
              title="Logout"
              onPress={async () => {
                await AsyncStorage.clear();
                await navigation.replace('Restaurant');
              }}
            />
          ) : (
            <View style={{flexDirection: 'row'}}>
              <DarkButton
                title="Login"
                onPress={() => navigation.navigate('Login')}
              />
              <DarkButton
                title="Register"
                onPress={() => navigation.navigate('Register')}
                style={{marginLeft: 6}}
              />
            </View>
          )}
        </>
      ),
    });
  }, [navigation, user]);

  return (
    <ScrollView>
      {data?.restaurants?.map((item: any, index: number) => (
        <RestaurantCard
          key={index}
          name={item?.name}
          image={item?.image}
          onPress={() => navigation.navigate('Product', {name: item?.name})}
        />
      ))}
    </ScrollView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({});
