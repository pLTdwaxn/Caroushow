import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";

import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";
import ControlPanel from "@/components/create/ControlPanel";
import ImagePreview from "@/components/create/ImagePreview";

type Props = {
  image: {
    data: ImagePickerAsset;
    isLoading: boolean;
    error: any;
  };
  cropperParams: {
    ratio: {
      width: number;
      height: number;
    };
    rows: number;
    columns: number;
  };
};

const CreatePanel = ({ image, cropperParams }: Props) => {
  const CreatePreview = () => (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <ImagePreview image={image} cropperParams={cropperParams} />
      <ControlPanel />
      <ActionsBar />
    </View>
  );

  return (image.data && <CreatePreview />) || <ImageSelectButton />;
};

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
});

export default connect(mapStateToProps)(CreatePanel);
