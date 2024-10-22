import { render } from '@testing-library/react-native';
import Index from '@/app/(tabs)/index';

describe('<Index />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Select an Image')).toBeTruthy();
  });
});
