import { connect } from "react-redux";

import { store } from "@/store";
import { cycleAspectRatio } from "@/store/actions";

import Button from "@/components/shared/Button";

type AspectRatioProps = {
  ratio: { width: number; height: number } | null;
};

const AspectRatioButton = ({ ratio }: AspectRatioProps) => {
  const buttonLabel = ratio ? `${ratio.width}:${ratio.height}` : "AR";

  return (
    <Button
      label={buttonLabel}
      onPress={() => {
        store.dispatch(cycleAspectRatio());
      }}
    ></Button>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ratio: state.cropperParams.ratio,
  };
};

const mapDispatchToProps = {
  cycleAspectRatio,
};

export default connect(mapStateToProps, mapDispatchToProps)(AspectRatioButton);
