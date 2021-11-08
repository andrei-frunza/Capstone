import 'react-native-gesture-handler'; 
import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';

const Stack = createStackNavigator();

const App = () => {

  return ( 
    <>
      <StatusBar barStyle='dark-content' hidden/>
      <NavigationContainer>
       <Stack.Navigator
         initialRouteName = 'Home'
         headerMode = 'screen'
         >
           <Stack.Screen
             name = 'Home'
             options={{
               headerShown: false
             }}
             >
               {(props) => <Home {...props} username = 'Andrei'/>}
             </Stack.Screen>
             
        

         </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
  
export default App;
