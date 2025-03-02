import { Provider } from "react-redux";
import store from "@/store";

import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "" }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
