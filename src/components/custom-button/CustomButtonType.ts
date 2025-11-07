import { ImageSourcePropType } from 'react-native';

export type CustomButtonProps = Partial<{
  buttonText: string;
  pressEvent: () => void;
  buttonStyle: any;
  textStyle: any;
  image: ImageSourcePropType | undefined;
  imageStyle: any;
}>;
