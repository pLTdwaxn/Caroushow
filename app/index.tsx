import { connect } from "react-redux";

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import ImageSelectButton from "@/components/ImageSelectButton";
import TopActionsBar from "@/components/TopActionsBar";
import BottomActionsBar from "@/components/BottomActionsBar";
import ImageSlider from "@/components/ImageSlider";

import { ImageState } from "@/types";

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
    <>
      <GestureHandlerRootView style={styles.container}>
        {image.asset !== null && <TopActionsBar />}
        <ImageArea />
        <BottomActionsBar />
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(create);
