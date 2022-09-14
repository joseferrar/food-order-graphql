import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Input from '../components/Inputs/Input';
import {RadiusButton} from '../components/Buttons/Buttons';
import {useMutation} from '@apollo/client';
import {REGISTER_QUERY} from '../graphql/queries';
import {HomeScreenNavigationProp} from '../navigation/types';

const Register = (props: HomeScreenNavigationProp) => {
  const {navigation} = props;
  const [register, {loading, data, error}] = useMutation(REGISTER_QUERY);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },

    validationSchema: yup.object({
      username: yup.string().required('username is required'),
      email: yup.string().email().required('email is required'),
      password: yup
        .string()
        .required('password is required')
        .min(8, '8 characters required'),
    }),

    onSubmit: async Data => {
      console.log(Data);
      await register({variables: {userInput: Data}})
        .then(res => {
          console.log(res);
          navigation.replace('Restaurant');
        })
        .catch(error => {
          console.error('error', error);
        });
    },
  });

  return (
    <View style={styles.container}>
      <Input
        label={'Username'}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        mode={'outlined'}
        style={styles.email}
        error={formik.touched.username ? formik.errors.username : null}
      />
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
        title="Register"
        onPress={formik.handleSubmit}
        style={styles.login}
      />
      <RadiusButton
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={styles.login}
      />
    </View>
  );
};

export default Register;

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
});
