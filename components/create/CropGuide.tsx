import { View, Text, StyleSheet, Dimensions } from "react-native";

type Props = {
  rows: number;
  columns: number;
  ratio: {
    width: number;
    height: number;
  };
};

export default function cropGuide({ rows, columns, ratio }: Props) {
  const width = Dimensions.get("window").width;
  const height = (width / ratio.width / columns) * ratio.height;

  const gridStyle = {
    width: width,
    height: height,
  } as any;

  return (
    <View style={styles.cropGuide}>
      <View id="topShade" style={styles.topShade}></View>
      <View style={[gridStyle, styles.cropGrids]}></View>
      <View id="bottomShade" style={styles.bottomShade}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cropGuide: {
    position: "absolute",
    top: 0,
    flexDirection: "column",
  },
  cropGrids: {
    borderWidth: 0.2,
    borderColor: "#fff",
  },
  topShade: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  bottomShade: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});