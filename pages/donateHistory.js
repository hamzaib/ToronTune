import React, { Component } from 'react';
import firebase from './firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, StackNavigator } from 'react-navigation-stack';
import { fromLeft, zoomIn, flipX, flipY } from 'react-navigation-transitions';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class DonateHistory extends Component {

    postDatabase = firebase.database().ref('car');
    state = { cars: {}, selectedId: '' }
    componentDidMount() {
        this.postDatabase.on('value', cars => {
            const carsJSON = cars.val();
            this.setState({ cars: carsJSON === null ? {} : carsJSON });

        })

        // this.carDatabase.push({color: 'yellow', id: '23'})
    }





    create() {
        this.postDatabase
            .push('Yesterday At 2PM' )
    }

    
    //Delete 

    delete() {
        if (this.state.selectedId === '') {
          return;
        }
        this.postDatabase.child(this.state.selectedId).set(null)
        this.setState({ selectedId: '' })



    }




    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Donate history</Text>

               
                   
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
    },
    heading:{
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 24,
    },
    wrap:{
        marginTop: 50,
    },
    button:{
        width: width - 90,
        marginBottom: 15,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#35314A',
        // borderRadius:10,
        // borderWidth: 1,
        // borderColor: '#fff'
      },
      btnText:{
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
      },
    

});