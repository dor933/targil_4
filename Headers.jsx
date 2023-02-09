import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';


<Header
  ViewComponent={LinearGradient} // Don't forget this!
  linearGradientProps={{
    colors: ['red', 'pink'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }}
/>

export default Header;