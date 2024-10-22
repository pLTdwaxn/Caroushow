import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import RoundButton from "../shared/RoundButton";

type HeaderProps = {
  label: string;
};

export default function CreateScreenHeader({ label }: HeaderProps) {
  const [socialMedia, setSocialMedia] = useState("");

  const changeSocialMedia = () => {};

  return (
    <View>
      <RoundButton onPress={changeSocialMedia} />
    </View>
  );
}
