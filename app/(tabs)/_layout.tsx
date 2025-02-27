import { Tabs } from "expo-router";

import { View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const NoTitle = () => {
  return <View />;
};

const TabLayout = () => {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: NoTitle,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cog-sharp" : "cog-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Create",
          headerTitle: NoTitle,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "create-sharp" : "create-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          headerTitle: NoTitle,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "images-sharp" : "images-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
