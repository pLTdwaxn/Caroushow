import { ImageState } from "@/types";
import { connect } from "react-redux";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";

type ImageSliderProps = {
  image: ImageState;
};

const ImageSlider = ({ image }: ImageSliderProps) => {
  const renderItem = ({ item }: { item: { uri: string } }) => (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.uri }}
        resizeMode="center"
      />
    </View>
  );

  return (
    <View style={styles.imageSlider}>
      <FlatList
        horizontal
        data={image.asset ? [image.asset] : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
        snapToInterval={screenWidth}
        decelerationRate="fast"
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: screenWidth * 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(ImageSlider);
