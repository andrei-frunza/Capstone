import 'react-native-gesture-handler'; 
import React,{useEffect, useState} from 'react';
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
  const [bgColor, setBG]=useState('white');
  const [textColor,setText]=useState('black');
  const [chargeState, setChargeState]=useState("0");
  var buffer;

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
  return(bgColor)
}

//This will constantly check the route for the charger state
//if no response, the device is OFF
//if response, the device is ON

async function checkState(){
    
  const resp = await fetch(`http://${espIP}/charging`,{
  method: 'GET',
  headers:{
      'cookie': cookie
  }}).catch(error =>{
    console.log(error);
  })
    buffer = resp.headers.get("charge-time");
    console.log(resp.headers.get("charge-time"));
}
  
  //Adding a set interval of 5000ms, making the app check for the charger state every 5 seconds
  useEffect(()=>{
    const interval = setInterval(() => {
      checkState();
     
    }, 1000);
    return() => clearInterval(interval);
  }, []);

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
               {(props) => <Home {...props} bgColor={bgColor} FontSize={FontSize} textColor={textColor} chargeState={chargeState} />}
            </Stack.Screen>

            <Stack.Screen
             name = 'History'
             options={{
               headerShown: false
             }}>
               {(props) => <History {...props} bgColor={bgColor} FontSize={FontSize} textColor={textColor} buffer={buffer}/>}
            </Stack.Screen>

            <Stack.Screen
             name = 'Settings'
             options={{
               headerShown: false
             }}>
               {(props) => <Settings {...props} changeSize={changeSize} changeColor={changeColor} bgColor={bgColor} FontSize={FontSize} textColor={textColor}  />}
            </Stack.Screen>
             

          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
  
export default App;
