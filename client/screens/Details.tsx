import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {HomeScreenNavigationProp} from '../navigation/types';
import {RadiusButton} from '../components/Buttons/Buttons';

const Details = ({route}: HomeScreenNavigationProp) => {
  const {params} = route;
  console.log(params);
  return (
    <View>
      <Image source={{uri: params?.imageUrl}} style={styles.image} />
      <Text style={styles.title}>{params?.product_name}</Text>
      <Text style={styles.paragraph}>$ {params?.price}</Text>
      <Text style={styles.desc}>{params?.product_desc}</Text>
      <RadiusButton
        title="Add to Cart"
        onPress={() => console.log('Add to Cart')}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 24,
  },
  desc: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    width: 350,
  },
  image: {
    width: 'auto',
    height: 300,
  },
  btn: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marignBottom: 30,
    marginTop: 30,
  },
  paragraph: {
    marginLeft: 12,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});
export default Details;
