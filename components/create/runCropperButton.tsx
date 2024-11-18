import { connect } from "react-redux";

import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

import ImageCropper from "@/app/ImageCropper";

type Props = {
  image: {
    uri: string;
  };
  cropperParams: {
    rows: number;
    cols: number;
    compress: number;
  };
};

const RunCropperButton = ({ image, cropperParams }: Props) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  // const runImageCropper = async () => {
  //   if (image) {
  //     const imageCropper = new ImageCropper(image.uri, cropperParams);

  //     return await imageCropper.run();
  //   }
  //   return [];
  // };

  // const saveImageAsync = async () => {
  //   try {
  //     const croppedImages = await runImageCropper();
  //     for (const croppedImage of croppedImages) {
  //       await MediaLibrary.saveToLibraryAsync(croppedImage.uri);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <Button
      label={<Ionicons name="download-outline" size={24} />}
      disabled={true}
      // onPress={saveImageAsync}
    />
  );
};

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
});

export default connect(mapStateToProps)(RunCropperButton);
