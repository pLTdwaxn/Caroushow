import { View, Button, Image, StyleSheet } from "react-native";
import { pickImageAsync } from "./utils";
import { connect } from "react-redux";
import store from "@/store";
import { ImageState } from "@/types";

type CreateTabProps = {
  image: ImageState;
};

const CreateTab = ({ image }: CreateTabProps) => {
  const Something = () => {
    if (image.asset !== null) {
      return <Image style={styles.image} source={{ uri: image.asset.uri }} />;
    }
    return <Button title="Select Image" onPress={pickImageAsync}></Button>;
  };

  return (
    <View style={styles.container}>
      <Something />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(CreateTab);
