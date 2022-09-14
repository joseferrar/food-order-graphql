import React, {FC} from 'react';
import {TextInput} from 'react-native-paper';
import {InputType} from '../../types/input';

const Input: FC<InputType> = props => {
  const handleChange = (event: any) => {
    props.onChangeText(event);
  };

  return (
    <TextInput
      label={props.label}
      value={props.value}
      onChangeText={handleChange}
      mode={props.mode}
      style={props.style}
      secureTextEntry={props.secureTextEntry}
      error={props.error}
    />
  );
};

export default Input;
