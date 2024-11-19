import React, { useState } from "react";
import { connect } from "react-redux";

import {
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";

import CropGuide from "@/components/create/CropGuide";
import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";

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

const ImageViewer = ({ image, cropperParams }: Props) => {
  const [imageRendered, setImageRendered] = useState(false);
  const [zoomed, setZoomed] = useState(true);

  const loadingSplash = <Text style={styles.text}>Loading...</Text>;

  const viewerWidth = Dimensions.get("window").width * cropperParams.columns;
  const viewerHeight = Dimensions.get("window").height;

  const viewerStyle = {
    flexGrow: 0,
    width: viewerWidth,
    height: viewerHeight,
  };

  const changeView = () => {
    setZoomed(!zoomed);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImagePickerAsset;
    index: number;
  }) => {
    return (
      <Image key={index.toString()} source={item} style={styles.imageStyle} />
    );
  };

  return (
    (image.isLoading && loadingSplash) ||
    (image.data && (
      <TouchableOpacity onPress={changeView}>
        {(zoomed && (
          <FlatList
            horizontal
            data={[image.data]}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={viewerStyle}
            pagingEnabled
          />
        )) || (
          <View>
            <Image
              source={{ uri: image.data.uri }}
              style={styles.imageStyle}
              contentFit="contain"
              onLoad={() => setImageRendered(true)}
            />
            {imageRendered && <CropGuide />}
            <View style={styles.actionsBarContainer}>
              <ActionsBar />
            </View>
          </View>
        )}
      </TouchableOpacity>
    )) || <ImageSelectButton />
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  cropGuideContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
  actionsBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
});

export default connect(mapStateToProps)(ImageViewer);
