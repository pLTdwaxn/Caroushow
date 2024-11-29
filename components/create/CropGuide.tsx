import { connect } from "react-redux";

import { View, StyleSheet, Dimensions } from "react-native";

type CropGuideProps = {
  rows: number;
  columns: number;
  ratio: {
    width: number;
    height: number;
  };
};

const CropGuide = ({ rows, columns, ratio }: CropGuideProps) => {
  const width = Dimensions.get("window").width;
  const height = (width / ratio.width / columns) * ratio.height;

  const gridStyle = {
    width: width,
    height: height,
  };

  const renderColumns = () => {
    const columnsArray = [];
    for (let i = 0; i < columns; i++) {
      columnsArray.push(
        <View
          key={i}
          style={{
            flex: 1,
            borderLeftWidth: i === 0 ? 0 : 0.2,
            borderColor: "#fff",
          }}
        />
      );
    }
    return columnsArray;
  };

  return (
    <View style={styles.cropGuideContainer}>
      <View id="topShade" style={styles.topShade}></View>
      <View style={[gridStyle, styles.cropGrids]}>{renderColumns()}</View>
      <View id="bottomShade" style={styles.bottomShade}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cropGuideContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
  cropGrids: {
    borderWidth: 0.2,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topShade: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomShade: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const mapStateToProps = (state: any) => ({
  rows: state.cropperParams.rows,
  columns: state.cropperParams.columns,
  ratio: state.cropperParams.ratio,
});

export default connect(mapStateToProps)(CropGuide);
