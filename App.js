import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/Homescreen';
import Contextprovide from './Components/Contextprovider';
import Personal from './Components/Personal';
import Work from './Components/Work';
import Ideas from './Components/Ideas';
import List from './Components/List';




const Stack = createNativeStackNavigator();

  

function App() {
  return (
    <Contextprovide>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Work" component={Work} />
        <Stack.Screen name="Ideas" component={Ideas} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
    </Contextprovide>
  );
}

export default App;

// code for light blue color is 
// #e7e7e8
