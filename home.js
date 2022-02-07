import { FadeOutToBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import React from 'react';
import { View, Image, Text, StyleSheet, backgroundColor, Button, Alert } from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { List, ListItem } from 'react-native-elements';
import Login from './login'



isConnected = new Boolean;
isConnected = 0;
espIP = Login.espIP
cookie = Login.cookie;

const Home =(props) => {
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
            <Text style={styles.title}>LED Switch Test App</Text>
            <Text style={styles.subtitle}>{props.username}</Text>
            <View style={styles.textcontainer}>
                <Text style={styles.content}>
                    {introText}
                </Text>
            </View>
            <Button
                title="LED Switch"
                onPress={() => buttonPress()
            }/>
           
            
            
            
            
        </View>
    );
}

const introText = `This is just a simple test to see if we can press the button from the app`;

const styles = StyleSheet.create({
    container: {
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
    }
});

export default Home;

async function buttonPress(){
    Alert.alert('LED Switch Pressed');
    
    await fetch(`http://${espIP}/toggle`,{
    method: 'GET',
    headers:{
        'cookie': cookie
    }}).catch(err => Alert.alert('not connected to ESP'));
    
}
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

