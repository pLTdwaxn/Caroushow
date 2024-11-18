import { connect } from "react-redux";
import { useState } from "react";

import { store } from "@/store";
import { setResults } from "@/store/actions";

import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

import { ImagePickerAsset } from "expo-image-picker";
import { ImageResult } from "expo-image-manipulator";

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
  results: ImageResult[];
};

const RunCropperButton = ({ image, cropperParams, results }: Props) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isRunning, setIsRunning] = useState(false);

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
      setIsRunning(true);
      const croppedImages = await runImageCropper();
      for (const croppedImage of croppedImages) {
        await MediaLibrary.saveToLibraryAsync(croppedImage.uri);
      }
      store.dispatch(setResults(croppedImages));
    } catch (e) {
      console.log(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button
      label={<Ionicons name="download-outline" size={24} />}
      disabled={!image || isRunning || results.length > 0}
      onPress={saveImageAsync}
    />
  );
};

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
  results: state.results,
});

const mapDispatchToProps = (dispatch: any) => ({
  setResults: (results: any) =>
    dispatch({ type: "SET_RESULTS", payload: results }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunCropperButton);
