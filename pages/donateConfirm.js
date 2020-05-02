import React, { Component } from 'react';
import firebase from './firebase';
import paypal from '../assets/paypal2.png';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
require('firebase/auth')

var {width} = Dimensions.get('window');

export default class DonateConfirmScreen extends Component {

    donateDatabase = firebase.database().ref('donations'); 

    state = { currentUser: null, userId: '', donations: {}, price: 0,  musicianId: '', accessToken: '', musicianProfPic: '', musicianName: '', errorMessage: null} 

   
    componentDidMount() {
        const user = firebase.auth().currentUser;
        const price =  this.props.navigation.getParam('price', 0);
        const musicianId =  this.props.navigation.getParam('musicianId', 0);
        const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        const userId =  this.props.navigation.getParam('userId', 'No data');

        this.setState({price: price});
        this.setState({musicianName: musicianName});
        this.setState({musicianId: musicianId});
        this.setState({accessToken: accessToken});
        this.setState({musicianProfPic: musicianProfPic});
        this.setState({userId: userId});

        if (user) {
            const currentUser = user.uid;
            this.setState({ currentUser: currentUser});
   
        } else {
            console.log("not logged in");
        }


       
        this.donateDatabase.on('value', donations=> {
            const donationsJSON = donations.val();
            this.setState({ donations: donationsJSON === null ? {} : donationsJSON});
          })

    }


    postReview = () => {
        
        var today = new Date();

        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();

        if(month < 10){
            month = "0" + month.toString();
        }

        if(day < 10){
            day = "0" + day.toString();
        }


        console.log( month + '/' + day + '/' + year);
                            
        this.donateDatabase.push({
            amount: this.state.price,
            musicianId: this.state.musicianId, 
            musicianName: this.state.musicianName,
            payer: this.state.currentUser,
            date:　month + ' / ' + day + ' / ' + year
           
        }) .then(
            () => this.props.navigation.navigate('DonateDone',
            { price: this.state.price, 
                musicianId: this.state.musicianId,
                musicianName: this.state.musicianName,
                accessToken: this.state.accessToken ,
                userId: this.state.userId ,
                musicianProfPic: this.state.musicianProfPic   })
            
        
        )

        .catch(error => this.setState({ errorMessage: error.message }))

       
    };



    render() {
       

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>YOU WILL DONATE</Text>

               
                    <View style={styles.wrap}>
                        
                        <Text style={styles.price}>$ {this.state.price}</Text>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.postReview}
                        >
                        
                            {/* <View style={styles.btnText}> */}
                                <Image resizeMode="contain" style={{height: 40, width: 90, alignSelf: 'center'}} source={paypal} />
                            {/* </View> */}
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
    price:{
        marginVertical: 30,
        fontWeight: 'bold',
        fontSize: 50,
        alignSelf: 'center'
    },
    wrap:{
        marginTop: 50,
    },
    button:{
        width: width - 90,
        height: 60,
        marginBottom: 15,
        padding:10,
        backgroundColor:'#D43E44',
        borderRadius:5,
        // borderWidth: 1,
        // borderColor: '#fff'
      },
     
    

});