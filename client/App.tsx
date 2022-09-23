import React, {FC} from 'react';
import RootNavigator from './navigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {Provider} from 'react-redux';
import {setContext} from '@apollo/client/link/context';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios'
import NetworkLogger from 'react-native-network-logger';
import store from './features/store';

const httpLink = createHttpLink({
  uri: 'http://192.168.7.35:5000/graphql',
});

const authLink = setContext(async (_, {headers}): Promise<any> => {
  const token: any = await AsyncStorage.getItem('token');
  const userData = await JSON.parse(token);
 
  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + userData?.token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: FC = () => {
  // const dd = axios.get('https://jsonplaceholder.typicode.com/users/1');
  // console.log('ax', dd)

  const MyScreen = () => <NetworkLogger theme="dark" sort="asc" />;

  return (
    <PaperProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RootNavigator />
        </ApolloProvider>
        {/* <MyScreen /> */}
      </Provider>
    </PaperProvider>
  );
};
export default App;
