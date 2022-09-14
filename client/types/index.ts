export interface IItem {
  title: string;
  description: string;
}

export interface Header {
  name: string;
}

type AutherType = {
  name: string;
  direction: [];
};
export interface MoviesType {
  release?: string;
  movie?: string;
  auther?: AutherType;
}

export interface ButtonType {
  children?: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}
