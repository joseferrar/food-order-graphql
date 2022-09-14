export interface ProductType {
  title: string;
  description: string;
  image: string;
  price: number;
  action: string;
  onPress: () => void;
  LongPress: () => void;
}

export interface RestaurantType {
  name: string;
  image: string;
  onPress: () => void;
}
