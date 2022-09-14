export interface InputType {
  label: string;
  onChangeText: (value?: any) => void;
  disabled?: boolean;
  value: string;
  placeholder?: string;
  error?: any;
  mode: 'flat' | 'outlined';
  style?: object;
  secureTextEntry?: boolean;
}
