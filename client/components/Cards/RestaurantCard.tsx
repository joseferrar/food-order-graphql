import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {RestaurantType} from '../../types/card';

const RestaurantCard = (props: RestaurantType) => {
  return (
    <Card style={styles.card} onPress={props.onPress}>
      <Card.Cover
        style={styles.image}
        source={{
          uri: props?.image,
        }}
      />
      <Card.Content>
        <Title style={styles.title}>{props.name}</Title>
      </Card.Content>
    </Card>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    width: 360,
    borderRadius: 15,

    margin: 16,
  },
  image: {
    width: 'auto',
    height: 300,
    resizeMode: 'cover',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  paragraph: {
    color: 'green',
  },
});
