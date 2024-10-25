import { connect } from "react-redux";

import Button from "@/components/shared/Button";

type AspectRatioProps = {
  ratio: { width: number; height: number } | null;
};

const AspectRatioButton = ({ ratio }: AspectRatioProps) => {
  const buttonLabel = ratio ? `${ratio.width}:${ratio.height}` : "AR";

  return <Button label={buttonLabel} disabled={true}></Button>;
};

const mapStateToProps = (state: any) => {
  return {
    ratio: state.cropperParams.ratio,
  };
};

export default connect(mapStateToProps)(AspectRatioButton);
