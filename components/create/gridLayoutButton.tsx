import { connect } from "react-redux";

import Button from "@/components/shared/Button";

type GridLayoutProps = {
  rows: number;
  columns: number;
};

const GridLayoutButton = ({ rows, columns }: GridLayoutProps) => {
  const buttonLabel = rows ? `${rows}:${columns}` : "? x ?";

  return <Button label={buttonLabel} disabled={true}></Button>;
};

const mapStateToProps = (state: any) => {
  return {
    rows: state.cropperParams.rows,
    columns: state.cropperParams.columns,
  };
};

export default connect(mapStateToProps)(GridLayoutButton);
