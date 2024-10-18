import { render } from '@testing-library/react-native';
import Index from '@/app/index';

describe('<Index />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Select an Image')).toBeTruthy();
  });
});
