import { Provider } from 'react-redux';
import store from '@/store';

import { Stack } from 'expo-router';
import TopActionsBar from '@/components/TopActionsBar';

const RootLayout = () => {
  return (
    <Provider store={store}>
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
