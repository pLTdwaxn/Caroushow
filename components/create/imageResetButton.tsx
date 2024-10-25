import { connect } from "react-redux";

import { store } from "@/store";
import { resetImage } from "@/store/actions";

import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "@/components/shared/Button";

type Props = {
  uri: string;
};

const ImageResetButton = ({ uri }: Props) => {
  return (
    <Button
      label={<Ionicons name="refresh-outline" size={24} />}
      disabled={!uri}
      onPress={() => {
        store.dispatch(resetImage());
      }}
    />
  );
};

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
});

export default connect(mapStateToProps)(ImageResetButton);
