import { Provider } from "react-redux";
import store from "@/store";

import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
