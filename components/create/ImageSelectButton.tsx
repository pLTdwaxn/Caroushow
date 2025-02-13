import { connect } from "react-redux";
import { setImage } from "@/store/actions";

import { pickImageAsync } from "@/utils/imagePickerUtil";

import Button from "@/components/shared/Button";

const ImageSelectButton = () => {
  return <Button label="Select an Image" onPress={pickImageAsync} />;
};

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
  width: state.image?.width,
  height: state.image?.height,
});

const mapDispatchToProps = {
  setImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelectButton);
