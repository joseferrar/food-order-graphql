export interface ButtonType {
  children?: string;
  onPress: (value?: any) => void;
  disabled?: boolean;
  color?: string;
  title: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  style?: object;
}
