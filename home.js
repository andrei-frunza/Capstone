import { FadeOutToBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import React from 'react';
import { View, Image, Text, StyleSheet, backgroundColor, Button, Alert } from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import { List, ListItem } from 'react-native-elements';


const zeroconf = new Zeroconf();
espIP = new String;
isConnected = new Boolean;
isConnected = 0;

zeroconf.on('resolved', service => {
    if(JSON.stringify(service).includes('esp')){
        console.log('it is here');
        espIP = service.host;
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
            <Button
                title="Start Up Our mDNS"
                onPress={() => start()
            }/>
            <Button
                title="Scan"
                onPress={() => scan()
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

function buttonPress(){
    Alert.alert('LED Switch Pressed');
    
    fetch(`http://${espIP}/toggle`)
        .catch(err => Alert.alert('not connected to ESP'));
    
}

function start(){
    zeroconf.publishService('http','tcp','local.','ourSERVER',80);
    Alert.alert('has been started')
}

function scan(){
    zeroconf.scan('http','tcp','local.')

    setTimeout(function() {
        zeroconf.stop();
      }, 3000);
}