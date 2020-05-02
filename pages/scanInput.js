import React, { Component } from 'react';
import firebase from './firebase';
import HeaderButton from '../assets/cancel.png';

import { Dimensions, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class Scaninput extends Component {

    state = { hasCameraPermission: null, scanned: false, id: '', data: '' };
    


    render() {
       
        const { goBack } = this.props.navigation;
      
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('Scan') }
                style={styles.closeBtn}
                >
                <Image
                source={HeaderButton}
                style={{width:15, height: 15}}
                />
                
            </TouchableOpacity>

            <View style={styles.header}>
            
                <Text style={styles.heading}>Enter Musician ID</Text>

               
                    <View style={styles.wrap}>

                        <View
                            style={{
                                // backgroundColor: value,
                            borderColor: '#000000',
                            borderWidth: 0.5,
                                marginVertical: 20,
                                marginHorizontal: 20, 
                                paddingVertical: 20,
                                width: width - 80,
                                height: 60,
                            
                            }}>


                        
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(data) => this.setState({ data })}
                                    underlineColorAndroid="transparent"
                                    placeholder="000000"
                                    placeholderTextColor="grey"
                                    numberOfLines={6}
                                    multiline={true}
                                />

                            </View>
                        
                      


                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('MusicianProfile',  { ttcId: this.state.data,
                                    scanFlag: 1
                                })}
                            
                            >
                            <Text style={styles.btnText}>Search</Text>
                        </TouchableOpacity>
                    </View>      
              </View>
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        
        
    },
    heading:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    closeBtn:{
        marginTop: 60,
        marginLeft: 'auto',
        
    },
    wrap:{
        marginTop: 50,
    },
    textInput:{
        
        fontSize: 16,
        paddingLeft: 20,
    }, 
    button:{
        width: width - 80,
        marginBottom: 15,
        marginHorizontal: 20,
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