import { connect } from "react-redux";
import { store } from "@/store";
import { reset } from "@/store/actions";

import { ImagePickerAsset } from "expo-image-picker";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

type Props = {
  image: {
    data: ImagePickerAsset;
    isLoading: boolean;
    error: any;
  };
};

const ResetButton = ({ image }: Props) => {
  return (
    <Button
      label={<Ionicons name="refresh-outline" size={24} />}
      disabled={!image.data}
      onPress={() => {
        store.dispatch(reset());
      }}
    />
  );
};

const mapStateToProps = (state: any) => ({
  image: state.image,
});

const mapDispatchToProps = {
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton);
