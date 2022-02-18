import React, {useState} from 'react';
import set from './images/set.png';
import { View, Image, Text, StyleSheet, backgroundColor, Button, Alert,TextInput, DevSettings } from 'react-native';


const History =(props) => {
    return(
        <View style={styles.container}>
            <Image 
            //The image from the URI only actually shows when 
            //i set a up here
               style={{width: 50, height: 50}}
               source= {set}
            /> 
            <Text style={styles.title}>Settings</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'grey' 
    },
    textcontainer:{
        textAlign: 'center',
        paddingTop: 10
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontWeight: 'bold',
        fontSize:25
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

export default History;
    
