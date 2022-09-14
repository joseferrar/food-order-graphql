import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ButtonType} from '../../types/button';
import {Button} from 'react-native-paper';

const RadiusButton: FC<ButtonType> = props => {
  return (
    <Button mode={'contained'} onPress={props.onPress} style={props.style}>
      {props.title}
    </Button>
  );
};

const DarkButton: FC<ButtonType> = props => {
  return (
    <Button
      mode={'contained'}
      onPress={props.onPress}
      style={props.style}
      contentStyle={{backgroundColor: '#000'}}>
      {props.title}
    </Button>
  );
};

export {RadiusButton, DarkButton};
