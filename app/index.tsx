import { connect } from "react-redux";

import { Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import ImageSelectButton from "@/components/ImageSelectButton";
import TopActionsBar from "@/components/TopActionsBar";
import BottomActionsBar from "@/components/BottomActionsBar";
import ImageSlider from "@/components/ImageSlider";

import { ImageState } from "@/types";
import store from "@/store";
import { setDevice } from "@/store/slices/deviceSlice";

const deviceDimensions = {
  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,
};

store.dispatch(setDevice(deviceDimensions));

type IndexPageProps = {
  image: ImageState;
};

const index = ({ image }: IndexPageProps) => {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        {image.asset !== null && (
          <>
            <TopActionsBar />
            <ImageSlider />
          </>
        )}
        {image.asset === null && <ImageSelectButton />}
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

export default connect(mapStateToProps)(index);
