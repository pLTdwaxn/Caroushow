import { Text, View, StyleSheet } from "react-native";
import { ImageState } from "@/types";
import ImageSlider from "@/components/createTab/ImageSlider";
import { connect } from "react-redux";
import ImageSelectButton from "@/components/createTab/ImageSelectButton";
import SocialMediaSelectButton from "@/components/createTab/SocialMediaSelectButton";
import ActionsBar from "./createTab/ActionsBar";

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
      <SocialMediaSelectButton />
      <View style={styles.content}>
        <ImageArea />
      </View>
      <ActionsBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(create);
