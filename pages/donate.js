import React, { Component } from 'react';
import firebase from './firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, StackNavigator } from 'react-navigation-stack';
import { fromLeft, zoomIn, flipX, flipY } from 'react-navigation-transitions';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class DonateScreen extends Component {

    
    state = {musicianId: '', accessToken: '', 
    musicianProfPic: '', userId: '',  musicianName: '', errorMessage: null}

    componentDidMount() {


        const musicianId =  this.props.navigation.getParam('musicianId', 0);
        const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        const userId =  this.props.navigation.getParam('userId', 'No data');

        this.setState({musicianName: musicianName});
        this.setState({musicianId: musicianId});
        this.setState({accessToken: accessToken});
        this.setState({musicianProfPic: musicianProfPic});
        this.setState({userId: userId});

        console.log("userId: " + userId);
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
                <Text style={styles.heading}>CHOOSE AMOUNT</Text>

               
                    <View style={styles.wrap}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DonateConfirmation', { price: 1, musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                        >
                            <Text style={styles.btnText}>$ 1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DonateConfirmation', { price: 2, musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                        >
                            <Text style={styles.btnText}>$ 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DonateConfirmation',{ price: 5, musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                        >
                            <Text style={styles.btnText}>$ 5</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DonateConfirmation', { price: 10, musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                        >
                            <Text style={styles.btnText}>$ 10</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('DonateInput', { price: 0, musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                        >
                            <Text style={styles.btnText}>CUSTOMIZE AMOUNT</Text>
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
        borderRadius:5,
        
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