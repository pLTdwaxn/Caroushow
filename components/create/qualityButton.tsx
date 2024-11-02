import { connect } from "react-redux";

import Button from "@/components/shared/Button";

type Props = {
  resize_quality: number;
};

const QualityButton = ({ resize_quality }: Props) => {
  return <Button label={`${resize_quality}p`} />;
};

const mapStateToProps = (state: any) => ({
  resize_quality: state.cropperParams?.resize,
});

export default connect(mapStateToProps)(QualityButton);
