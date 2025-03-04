import { SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import IconButton from "@/components/IconButton";

import socialMediaList from "./socialMediaList";

const SocialMediaSelect = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(socialMediaList[0]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectPlatform = (
    platform: SetStateAction<{
      name: string;
      icon: string;
      color: string;
      minRatio: number;
      maxRatio: number;
    }>
  ) => {
    setSelectedPlatform(platform);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.socialMediaSelection}>
      {dropdownVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDropdown} />
      )}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          styles.socialMediaIcon,
          { backgroundColor: selectedPlatform.color },
        ]}
      >
        <IconButton
          icon={
            <Ionicons
              name={selectedPlatform.icon as keyof typeof Ionicons.glyphMap}
              size={24}
              color="white"
            />
          }
          onPress={toggleDropdown}
        />
      </TouchableOpacity>
      <View style={styles.textLabel}>
        <Text style={styles.boldText}>Caroushow</Text>
        <Text style={styles.whiteText}>
          Designing for {selectedPlatform.name}
        </Text>
      </View>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {socialMediaList.map((platform) => (
            <TouchableOpacity
              key={platform.name}
              onPress={() => handleSelectPlatform(platform)}
              style={styles.dropdownItem}
            >
              <Ionicons
                name={platform.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color="black"
              />
              <Text style={styles.dropdownText}>{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  socialMediaSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    marginLeft: 12,
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  whiteText: {
    color: "white",
  },
  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dropdownText: {
    marginLeft: 10,
    color: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1,
  },
});

export default SocialMediaSelect;
