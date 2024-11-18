import { connect } from "react-redux";
import { useState } from "react";

import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

import { ImageResult } from "expo-image-manipulator";

type Props = {
  hasImage: boolean;
  results: ImageResult[];
};

const RunCropperButton = ({ hasImage, results }: Props) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isRunning, setIsRunning] = useState(false);

  if (status === null) {
    requestPermission();
  }

  const saveImageAsync = async () => {
    try {
      setIsRunning(true);
      for (const croppedImage of results) {
        await MediaLibrary.saveToLibraryAsync(croppedImage.uri);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button
      label={<Ionicons name="download-outline" size={24} />}
      disabled={!hasImage || isRunning}
      onPress={saveImageAsync}
    />
  );
};

const mapStateToProps = (state: any) => ({
  hasImage: !!state.image,
  results: state.results,
});

const mapDispatchToProps = (dispatch: any) => ({
  setResults: (results: any) =>
    dispatch({ type: "SET_RESULTS", payload: results }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunCropperButton);
