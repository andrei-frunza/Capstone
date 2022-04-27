import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeModules, View, Image, Text, StyleSheet, backgroundColor, Button, Alert, NativeEventEmitter, AppRegistry} from 'react-native';
import Login from './login';
import power from'./images/Power.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import hist from './images/hist.png';
import set from './images/set.png';
import DeviceInfo, {useBatteryLevel} from 'react-native-device-info';


isConnected = 0;
espIP = Login.espIP;
cookie = Login.cookie;


class Battery extends React.Component {
    state = {
        batteryLevel:null,
    };

    componentDidMount = () => {
        const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

        DeviceInfo.getBatteryLevel().then((batteryLevel) => {
           console.log(batteryLevel);
           this.setState({batteryLevel});
         });
         this._subscription = deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelDidChange', (batteryLevel) => {
            this.setState({ batteryLevel });
            console.log('batteryLevel changed!', batteryLevel);
          });
   }

    render(){
        return <Text>Battery Level: {parseFloat(this.state.batteryLevel).toFixed(2) * 100 + '%'} </Text>
    }

}






const Home =({FontSize,bgColor,textColor}) => {
            const navigation = useNavigation();
            isConnected = new Boolean;

        

            
    return(
    <View style={[styles.background,{backgroundColor: bgColor}]}>
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Wireless Charger Controller</Text>
            <View style={styles.textcontainer}>
            </View> 
        </View>
        <TouchableOpacity onPress={() =>{ buttonPress(),timePressed=Date()}}>
            <Image  
                style={{width: 200, height: 200}}
                source= {power}
            /> 
        </TouchableOpacity>
        <Text style={[styles.text,{fontSize: FontSize, color: textColor}]}>Press to turn Charger on and off</Text>

        <View style ={styles.spacing}>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("History")}>
            <Text>Historical Use</Text>
            <Image 
               style={{width: 50, height: 50}}
               source= {hist}
            /> 
        </TouchableOpacity>
        </View>
        <View style ={styles.spacing}>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Settings")}>
            <Text>Settings</Text>
            <Image 
               style={{width: 50, height: 50}}
               source= {set}
            /> 
        </TouchableOpacity>
        <Battery/>
       
    </View>
    </View>
    </View>
    );
}
const styles = StyleSheet.create({
    background :{
        flex:1
    },
    text: {
        textAlign:'center'
    },
    spacing: {
        width:'50%',
        padding:10,
        alignItems:'center'
    },
    button: {
        borderRadius: 10,
        fontFamily:'Ubuntu-Bold',
        alignItems:'center',
        backgroundColor:'gray',
        width:'80%',
        flexDirection: 'row',
        padding:10
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'cornflowerblue' 
    },
    textcontainer:{
        textAlign: 'center',
        paddingTop: 10
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize:25,
        fontWeight:'bold'
    },
    subtitle: {
        fontFamily: 'Ubuntu-Regular',
        paddingTop: 5
    },
    content: {
        fontFamily: 'Ubuntu-Light',
        fontWeight: '300',
        textAlign: 'center'
    }
});

export default Home;

async function buttonPress(){
    Alert.alert('LED Switch Pressed');
    
    const res = await fetch(`http://${espIP}/toggle`,{
    method: 'GET',
    headers:{
        'cookie': cookie
    }}).catch((err) =>{
     Alert.alert('not connected to ESP');
     console.log(err)
    })
    
}
//Testing to see
function rateOfCharge(){
    
}

AppRegistry.registerComponent('RCTBattery', () => RCTBattery);
//THE FUNCTION BELOW IS OBSOLETE, IT WAS JUST FOR TESTING PURPOSES
//function scanJson(){
//    fetch(`http://${espIP}/test`)
//        .then((response) => (response.json())
//        .then(data => console.log(data))
//    ) 
//        .catch((error) => {
//            console.error(error);
//         });
//    }