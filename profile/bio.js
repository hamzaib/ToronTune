import React, { Component } from 'react';
import { Item, Form, Input, Button, Label, Row } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Profile1 from '../assets/profileimg.jpg';
import Profile2 from '../assets/profile-2.jpg';
import firebase from '../pages/firebase';


export default class Bio extends Component {


    bioPicsDatabase = firebase.database().ref('bioPics'); 
    state = {  bioPics: {}}

    componentDidMount() {
        // this.postDatabase.on('value', cars => {
        //     const carsJSON = cars.val();
        //     this.setState({ cars: carsJSON === null ? {} : carsJSON });

        // })

        // const musicianId =  this.props.navigation.getParam('musicianId', 0);
        // const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        // const instrument = this.props.navigation.getParam('instrument', 'No data');
        // const musicianBio = this.props.navigation.getParam('musicianBio', 'No data');
        // const musicianEmail = this.props.navigation.getParam ('musicianEmail', 'No data');
        // const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        // const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        // const ttcId =  this.props.navigation.getParam('ttcId', 'No data');
        // const userId =  this.props.navigation.getParam('userId', 'No data');

        // this.setState({musicianBio: musicianBio});
        // this.setState({musicianName: musicianName});
        // this.setState({musicianId: musicianId});
        // this.setState({instrument: instrument});
        // this.setState({musicianEmail: musicianEmail});
        // this.setState({accessToken: accessToken});
        // this.setState({musicianProfPic: musicianProfPic});
        // this.setState({ttcId: ttcId});
        // this.setState({userId: userId});

        // console.log("userId: " + userId);



        this.bioPicsDatabase.on('value', bioPics=> {
            const bioPicsJSON = bioPics.val();
            this.setState({ bioPics: bioPicsJSON === null ? {} : bioPicsJSON});
          })
      
        //   this.musiciansDatabase.on('value', musicians=> {
        //     const musiciansJSON = musicians.val();
        //     this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON});
        //   })
  
         

    }
   

    render() {
        console.log("id: " + this.props.screenProps.userId);
    //    console.log("bioPicArray: "+ JSON.stringify(this.props.screenProps.bioPics));
    
        return (


            <View style={styles.container}>
                <Text>{this.props.screenProps.musicianBio}</Text>
                <View style={{ flexDirection: 'column', marginTop: 15, marginLeft: -5 }}>
                
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',marginTop: 5, }}>

                        {

                        (Object.keys(this.state.bioPics).length == 0) ? (
                            <Image style={{width: '48%', height: 130, margin: 2}} resizeMode="cover" source={Profile1} />
                        ):(

                             Object.keys(this.state.bioPics).map((pic, index) => {
                                //  console.log("URL" + JSON.stringify(this.state.bioPics[pic].bioPicUrl));

                                return(
                                    // <Image style={{width: '48%', height: 130, margin: 2}} resizeMode="cover" source={Profile1} />
                                  (JSON.stringify(this.state.bioPics[pic].userId).slice(1,-1) === this.props.screenProps.userId) && (

                                    <Image key={index} style={{width: '48%', height: 130, margin: 2}} resizeMode="cover" source={{uri: `${JSON.stringify(this.state.bioPics[pic].bioPicUrl).slice(1, -1)}`}} />
                                  )
                                )
                            })
                        )
        
                        }
                        
                    
                    </View>

                 
                   

                </View>
            </View>











        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 25

    },

    DonateBtn: {

        backgroundColor: '#D43E43',
        fontSize: 30,
        color: '#FFFFFF',
        borderRadius: 5,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'

    },

    name: {
        fontSize: 15,
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        color: 'white',


    }


});