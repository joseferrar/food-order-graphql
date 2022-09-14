import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {ProductType} from '../../types/card';

const ProductCard = (props: ProductType) => {
  return (
    <Card style={styles.card} onPress={props.onPress}>
      <Card.Cover
        style={styles.image}
        source={{
          uri: props?.image,
        }}
      />
      <Card.Content>
        <Title style={styles.title}>{props.title}</Title>
        <Paragraph style={styles.paragraph}>$ {props.price}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.button}>
        <Button mode="contained" onPress={props.LongPress}>
          {props.action}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderRadius: 15,
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontWeight: 'bold',
  },
  paragraph: {
    color: 'green',
  },
});
