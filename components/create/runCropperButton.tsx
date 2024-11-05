import { connect } from "react-redux";

import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

import { ImagePickerAsset } from "expo-image-picker";

import ImageCropper from "@/core/ImageCropper";

type Props = {
  image: ImagePickerAsset | undefined;
  cropperParams: {
    rows: number;
    columns: number;
    ratio: {
      width: number;
      height: number;
    };
    compress: number;
    resize: number;
  };
};

const RunCropperButton = ({ image, cropperParams }: Props) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const runImageCropper = async () => {
    if (image) {
      return await ImageCropper.getInstance(image, cropperParams).run();
    }
    return [];
  };

  const saveImageAsync = async () => {
    try {
      const croppedImages = await runImageCropper();
      for (const croppedImage of croppedImages) {
        await MediaLibrary.saveToLibraryAsync(croppedImage.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      label={<Ionicons name="download-outline" size={24} />}
      disabled={!image}
      onPress={saveImageAsync}
    />
  );
};

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
});

export default connect(mapStateToProps)(RunCropperButton);
