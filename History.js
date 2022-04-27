import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, backgroundColor, Button, Alert,TextInput, DevSettings } from 'react-native';
import hist from './images/hist.png';
import Home from './home';

timePressed=Home.timePressed;

const History =({props,textColor,bgColor,buffer}) => {

    //The class will take the current time and subtract the time that the charger has been running to
    //generate a start time
    class ChargeTime extends React.Component {

        state = {
            time:null,
            date:null
        };
    
    componentDidMount(){
        this.setState({time:buffer,date:Date()})

    }

        render(){
            return(
            <View>
                <Text>Date: {this.state.date}</Text>
                <Text>Charge Time: {this.state.time} </Text>
            </View>
            )
    }}





    return(
        <View style={[styles.background,{backgroundColor: bgColor}]}>
        <View style={styles.container}>
            <Image 
            //The image from the URI only actually shows when 
            //i set a up here
               style={{width: 50, height: 50}}
               source= {hist}
            /> 
            <Text style={styles.title}>Historical Use</Text>
            
        </View>
        <ChargeTime/>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1
    },
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
        fontFamily: 'Ubuntu-Bold',
        fontWeight:'bold',
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
    
