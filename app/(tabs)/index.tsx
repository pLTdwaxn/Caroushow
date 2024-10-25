import { Provider } from "react-redux";
import { store } from "@/store";

import { View, Dimensions, StyleSheet } from "react-native";

import ImageViewer from "@/components/create/ImageViewer";
import ActionsBar from "@/components/create/ActionsBar";

export default function Index() {
  const SocialMedia = [
    {
      name: "Instagram",
      imgRatio: {
        width: 4,
        height: 5,
      },
    },
  ];

  const targetSocialMedia = SocialMedia.find(
    (media) => media.name === "Instagram"
  );

  const socialMediaImageRatio = targetSocialMedia
    ? targetSocialMedia.imgRatio
    : { width: 1, height: 1 };

  const { width, height } = socialMediaImageRatio;

  const viewerStyle = {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width / width) * height,
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={[styles.imageContainer, viewerStyle]}>
          <ImageViewer />
        </View>
        <View style={styles.chinContainer}>
          <ActionsBar />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    backgroundColor: "#000",
    justifyContent: "center",
  },
  chinContainer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "flex-end",
  },
});
