import { StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";

type Props = {
  imgSource: string;
  imgRatio: {
    width: number;
    height: number;
  };
};

export default function ImageViewer({ imgSource, imgRatio }: Props) {
  const { width, height } = imgRatio;

  console.log(imgRatio);

  const imgStyle = {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width / width) * height,
  };

  console.log(imgStyle);

  return <Image source={imgSource} style={imgStyle} />;
}

const styles = StyleSheet.create({});
