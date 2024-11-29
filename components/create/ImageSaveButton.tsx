import { connect } from "react-redux";
import { store } from "@/store";
import { runCropper } from "@/store/actions";

import { ImageResult } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

type Props = {
  results: { data: ImageResult[]; isLoading: boolean; error: any };
};

const ImageSaveButton = ({ results }: Props) => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const saveImageAsync = async () => {
    store.dispatch(runCropper());

    try {
      await results.data.forEach((croppedImage) => {
        MediaLibrary.saveToLibraryAsync(croppedImage.uri);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      label={<Ionicons name="download-outline" size={24} />}
      disabled={results.data.length === 0 || results.isLoading}
      onPress={saveImageAsync}
    />
  );
};

const mapStateToProps = (state: any) => ({
  results: state.results,
});

const mapDispatchToProps = {
  runCropper,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSaveButton);
