import React, { Component } from 'react';
import firebase from './firebase';

import { Dimensions, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import paypal from '../assets/paypal2.png';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class DonateInputScreen extends Component {
     
    state = {musicianId: '', accessToken: '', musicianProfPic: '', userId: '',  musicianName: '', errorMessage: null}

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
    }





    render() {
        const price =  this.props.navigation.getParam('price', );
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Customize Amount</Text>

               
                    <View style={styles.wrap}>

                       
                            <Text style={styles.price}>$</Text>
                        
                       
                        <TextInput
                      
                               placeholder="0"
                               style={styles.priceInput}
                               onChangeText={(amount) => this.setState({amount})}
                           
                           />
      
                    
                    </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('MusicianProfile',
                             { price: this.state.amount, 
                                musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic   })}
                        >
                            <Image resizeMode="contain" style={{height: 40, width: 90, alignSelf: 'center'}} source={paypal} />
                        </TouchableOpacity>
                    
              
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
       flexDirection: 'row',
       
        alignItems: 'flex-start',
       
    },

    price:{
   
        marginRight: 50,
        fontWeight: 'bold',
        fontSize: 30,
       
    },
    priceInput: {
        marginRight: 50,
        fontWeight: 'bold',
        fontSize: 50,
    },

   
    button:{
        width: width - 90,
        height: 60,
        marginBottom: 15,
        padding:10,
        paddingBottom:20,
        backgroundColor:'#D43E44',
        marginVertical: 30,
        borderRadius:5,
        // borderWidth: 1,
        // borderColor: '#fff'
      },
     
    

});