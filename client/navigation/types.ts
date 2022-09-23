import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  Product: {
    name: string;
  };
  Restaurant: undefined;
  Login: undefined;
  Register: undefined;
  Cart: undefined;
  Order: undefined;
  Details: {
    product_name: string;
    product_desc: string;
    price: number;
    imageUrl: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Details',
  'Product'
>;
