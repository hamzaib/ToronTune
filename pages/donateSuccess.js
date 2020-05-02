import React, { Component } from 'react';
import firebase from './firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, StackNavigator } from 'react-navigation-stack';
import { fromLeft, zoomIn, flipX, flipY } from 'react-navigation-transitions';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class DonateConfirmScreen extends Component {


    render() {
        const price =  this.props.navigation.getParam('price', 0);
        const musicianId =  this.props.navigation.getParam('musicianId', 0);
        const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        const userId =  this.props.navigation.getParam('userId', 'No data');

        const picUrl = `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${musicianProfPic}?alt=media&token=${accessToken}`;


        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Thank you!</Text>

               
                    <View style={styles.wrap}>


                         <Text style={styles.name}>{musicianName}</Text>
                         <View> 
                            <Image style={{ height: 200, width: '100%' }} source={{ uri: picUrl  }} resizeMode='cover' />
                                                        
                        </View>

                        
                        <Text style={styles.price}>$ {price}</Text>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('MusicianProfile')}
                           
                        >
                            <Text style={styles.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
              
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
        fontSize: 30,
    },
    name: {
        marginVertical: 30,
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center'
    },
    price:{
        marginVertical: 30,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
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