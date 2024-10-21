import { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

type props = {
  children: React.ReactNode;
};

export default function ActionsBar({ children }: props) {
  return <View style={styles.actionsBar}>{children}</View>;
}

const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
});
