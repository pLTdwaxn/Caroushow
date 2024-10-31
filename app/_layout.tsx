import { Provider } from "react-redux";
import { store } from "@/store";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
