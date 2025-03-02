import { Text, View, StyleSheet } from "react-native";
import { ImageState } from "@/types";
import ImageSlider from "@/components/createTab/ImageSlider";
import { connect } from "react-redux";
import ImageSelectButton from "@/components/createTab/ImageSelectButton";
import TopActionsBar from "@/components/createTab/TopActionsBar";
import BottomActionsBar from "@/components/createTab/BottomActionsBar";

type CreateTabProps = {
  image: ImageState;
};

const create = ({ image }: CreateTabProps) => {
  const ImageArea = () => {
    if (image.asset !== null) {
      return <ImageSlider />;
    }
    return <ImageSelectButton />;
  };

  return (
    <View style={styles.container}>
      {image.asset !== null && <TopActionsBar />}
      <View style={styles.imageAreaContainer}>
        <ImageArea />
      </View>
      <BottomActionsBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageAreaContainer: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(create);
