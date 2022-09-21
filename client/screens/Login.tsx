import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Input from '../components/Inputs/Input';
import {RadiusButton} from '../components/Buttons/Buttons';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_USER_ID, LOGIN_QUERY} from '../graphql/queries';
import {NavigationProp, RouteProp} from '@react-navigation/native';

const Login = props => {
  const {navigation} = props;
  const [login, {loading, data, error}] = useMutation(LOGIN_QUERY, {
    refetchQueries: GET_USER_ID,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: yup.object({
      email: yup.string().email().required('email is required'),
      password: yup
        .string()
        .required('password is required')
        .min(8, '8 characters required'),
    }),

    onSubmit: async Data => {
      console.log(Data);
      await login({variables: Data})
        .then(res => {
          AsyncStorage.setItem('token', JSON.stringify(res.data.login));
          console.log(res);
          navigation.replace('Restaurant');
        })
        .catch(error => {
          console.error('Invalid email or password');
        });
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <Input
        label={'Email'}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        mode={'outlined'}
        style={styles.email}
        error={formik.touched.email ? formik.errors.email : null}
      />
      <Input
        label={'Password'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        mode={'outlined'}
        style={styles.password}
        secureTextEntry={true}
        error={formik.touched.email ? formik.errors.email : null}
      />
      <RadiusButton
        title="Login"
        onPress={formik.handleSubmit}
        style={styles.login}
      />
      <RadiusButton
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.login}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    width: 350,
    height: 50,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  password: {
    width: 350,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    marginTop: 20,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
});
