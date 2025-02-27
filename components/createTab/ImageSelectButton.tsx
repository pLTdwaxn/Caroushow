import { pickImageAsync } from "./utils";
import { Button } from "react-native";

const ImageSelectButton = () => {
  return <Button title="Select Image" onPress={pickImageAsync}></Button>;
};

export default ImageSelectButton;
