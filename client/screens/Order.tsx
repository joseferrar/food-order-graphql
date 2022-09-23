import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {List, MD3Colors} from 'react-native-paper';
import {HomeScreenNavigationProp} from '../navigation/types';
import {GET_USER_ID} from '../graphql/queries';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = ({navigation, route}: HomeScreenNavigationProp) => {
  const [getUser, {data}] = useMutation(GET_USER_ID);

  const UserRequest = async () => {
    const token: any = await AsyncStorage.getItem('token');
    const userData = await JSON.parse(token);
    console.log(data);
    await getUser({variables: {userId: userData?.userId}});
  };
  useEffect(() => {
    UserRequest();
  }, []);
  return (
    <View>
      <List.Section>
        <List.Subheader>Some title</List.Subheader>
        <List.Item
          title="First Item"
          left={() => <List.Icon icon="account" />}
        />
        <List.Item
          title="Second Item"
          left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
        />
      </List.Section>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});
