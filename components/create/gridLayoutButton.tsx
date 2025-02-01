import { connect } from "react-redux";
import { store } from "@/store";
import { cycleColumns } from "@/store/actions";

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
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutButton);
