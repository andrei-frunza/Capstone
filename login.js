import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, backgroundColor, Button, Alert,TextInput } from 'react-native';
import Zeroconf from 'react-native-zeroconf';

const zeroconf = new Zeroconf();
var user ;
var pass ;
var cookie;


zeroconf.on('resolved', service => {
    if(JSON.stringify(service).includes('esp')){
        console.log('it is here');
        espIP = service.host;
         espIP;
        isConnected = 1;
        Alert.alert('The ESP has been found')
    }
})

zeroconf.on('start', () => {
    console.log('scan has started')
})

zeroconf.on('stop', () => {
    console.log('scan has ended')
    if(isConnected == 0){
        Alert.alert('The ESP could not be found')
    }
})


const Login =({navigation}) => {
    return(
        <View style={styles.container}>
            <Image 
            //The image from the URI only actually shows when 
            //i set a up here
               style={{width: 50, height: 50}}
               source= {{
                   uri:
                    'https://reactnative.dev/img/tiny_logo.png'
               }}
            /> 
            <Text style={styles.title}>Login page tester</Text>

            <View style={styles.loginBox}>
                <Text>Please input Username and Password</Text>
                <View>
                    <Text>Username:</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder="username..."  
                    onChangeText={(val) => user = val}
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder="password..." 
                    onChangeText={(val) => pass = val}  
                    />
                </View>
            </View>
            <Button
                title="Login"
                onPress= {async function(){
                    let test =  await sendJson(user,pass);
                    if (test==true){
                        navigation.navigate("Home");
                }
                }
            }
            
            />
            <Button
                title="Scan for Charger"
                onPress={() => scan()}
            />
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'cornflowerblue' 
    },
    body:{
        flexDirection: 'column',
        alignItems: 'left',
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontFamily: 'Ubuntu-Bold'
    },
    subtitle: {
        fontFamily: 'Ubuntu-Regular',
        paddingTop: 5
    },
    content: {
        fontFamily: 'Ubuntu-Light',
        fontWeight: '300',
        textAlign: 'center'
    },
    input: {
        backgroundColor:'white',
        borderWidth: 2
    },
    loginBox: {
        margin: 5
    }
});

export default Login;

function scan(){
    zeroconf.scan('http','tcp','local.')

    setTimeout(function() {
        zeroconf.stop();
      }, 3000);
}

async function sendJson(first, second){
    let connecetionObject ={
        user: first,
        pass: second,
    };


    const res = await fetch(`http://${espIP}/connect`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(connecetionObject)
    }).catch((error) => {
        console.error(error);
     });
    cookie=(res.headers.get("set-cookie"));
    //consol log below tests that the cookie value has been set by the login
    console.log(cookie);
if(res.headers.has("set-cookie") == false){
    Alert.alert("Either Username of Pass is wrong.")
    return false;
}else{return true;}
}