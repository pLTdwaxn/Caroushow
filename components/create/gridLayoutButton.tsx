import { connect } from "react-redux";
import { store } from "@/store";
import { cycleColumns, runCropper } from "@/store/actions";

import Button from "@/components/shared/Button";

type GridLayoutProps = {
  columns: number;
};

const GridLayoutButton = ({ columns }: GridLayoutProps) => {
  const buttonLabel = `x${columns}`;

  return (
    <Button
      label={buttonLabel}
      onPress={() => {
        store.dispatch(cycleColumns());
        store.dispatch(runCropper());
      }}
    ></Button>
  );
};

const mapStateToProps = (state: any) => {
  return {
    columns: state.cropperParams.columns,
  };
};

const mapDispatchToProps = {
  cycleColumns,
  runCropper,
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutButton);
