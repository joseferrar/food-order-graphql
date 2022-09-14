import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {GET_USER_ID} from '../graphql/queries';

const useAuth = () => {
  const [getUser, {loading, data, error}] = useMutation(GET_USER_ID);
  const [user, setUser] = useState();

  const userAction = async () => {
    const token: any = await AsyncStorage.getItem('token');
    const userData = await JSON.parse(token);
    await setUser(userData);
    await getUser({variables: {userId: data?.getUser?.userId}});
  };

  useEffect(() => {
    userAction();
  }, []);

  return {user, loading, error};
};

export default useAuth;
