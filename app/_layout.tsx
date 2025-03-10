import { Provider } from 'react-redux';
import store from '@/store';

import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => null,
          }}
        />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
