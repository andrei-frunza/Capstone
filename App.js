import 'react-native-gesture-handler'; 
import React,{useState} from 'react';
import { Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import Login from './login';
import History from './History';
import Settings from './Settings';

const Stack = createStackNavigator();

const App = () => {

  const [FontSize,setFontSize]=useState(20);
  const [bgColor, setBG]=useState('white')
  const [textColor,setText]=useState('black')

  const changeSize=()=>{
        
    if(FontSize==20){
        setFontSize(32);
        
    }
    else{
        setFontSize(20);
        
    }
    return(FontSize)
}

const changeColor=()=>{
        
  if(bgColor=='black'){
      setBG('white');
      setText('black');
      
  }
  else{
      setBG('black');
      setText('gray');
      
  }
  return(FontSize)
}
  
  return ( 
    <>
      <StatusBar barStyle='dark-content' hidden/>
      <NavigationContainer>
       <Stack.Navigator
         initialRouteName = 'Login'
         headerMode = 'screen'
         >
           <Stack.Screen
             name = 'Login'
             options={{
               headerShown: false
             }}>
               {(props) => <Login {...props} bgColor={bgColor} FontSize={FontSize} textColor={textColor} />}
            </Stack.Screen>

            <Stack.Screen
             name = 'Home'
             options={{
               headerShown: false
             }}>
               {(props) => <Home {...props} bgColor={bgColor} FontSize={FontSize} textColor={textColor} />}
            </Stack.Screen>

            <Stack.Screen
             name = 'History'
             options={{
               headerShown: false
             }}>
               {(props) => <History {...props} bgColor={bgColor} FontSize={FontSize} textColor={textColor} />}
            </Stack.Screen>

            <Stack.Screen
             name = 'Settings'
             options={{
               headerShown: false
             }}>
               {(props) => <Settings {...props} changeSize={changeSize} changeColor={changeColor} bgColor={bgColor} FontSize={FontSize} textColor={textColor} />}
            </Stack.Screen>
             

          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
  
export default App;
