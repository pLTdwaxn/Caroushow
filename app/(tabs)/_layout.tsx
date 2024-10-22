import { View, Text } from "react-native";

import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import CreateScreenHeader from "../../components/create/Header";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="create">
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
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
          headerTitle: (props) => <CreateScreenHeader label="Custom Header" />,
          headerStyle: {
            backgroundColor: "#eee",
            height: 150,
          },
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
}
