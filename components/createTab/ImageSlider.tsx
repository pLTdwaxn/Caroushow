import { ImageState } from "@/types";
import { connect } from "react-redux";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import CropOverlay from "@/components/createTab/CropOverlay";
import AspectRatioLabel from "@/components/createTab/AspectRatioLabel";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type ImageSliderProps = {
  image: ImageState;
};

const ImageSlider = ({ image }: ImageSliderProps) => {
  const imageWidth = image.asset ? image.asset.width : 0;
  const imageHeight = image.asset ? image.asset.height : 0;

  const imageContainerDimensions = {
    width: screenWidth * 3,
    height: imageWidth
      ? (screenWidth * 3 * imageHeight) / imageWidth
      : screenHeight,
  };

  const renderItem = ({ item }: { item: { uri: string } }) => (
    <View style={[imageContainerDimensions, styles.imageContainer]}>
      <Image
        style={styles.image}
        source={{ uri: item.uri }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.imageSlider}>
      {image.asset && (
        <>
          <FlatList
            horizontal
            data={[image.asset]}
            renderItem={renderItem}
            snapToInterval={screenWidth}
            decelerationRate="fast"
          />
          <CropOverlay />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    justifyContent: "flex-start",
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
