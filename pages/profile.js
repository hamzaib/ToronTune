import React, { Component } from 'react';
import firebase from './firebase';
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer } from 'react-navigation'
import { Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Profile1 from '../assets/profile-1.jpg';
 import bio from '../profile/bio'
import review from '../profile/reviews';
import Schedule from '../profile/schedule';
import Hire from '../profile/hire';


 


const Tab = createMaterialTopTabNavigator({
    Bio:{
        screen:bio
    },
    Review:{
        screen:review
    },
    Schedule:{
        screen:Schedule
    },
    Hire:{
        screen:Hire
    },

}
,{
    tabBarOptions:{
        upperCaseLabel:false,
        labelStyle:{
            fontWeight: "bold",
            fontSize:12
        },
        indicatorStyle:{
            backgroundColor:'#D43E43',
            // height:3
        },
        style:{
            backgroundColor:'white',
       
            // elevation:1,
            // shadowColor:'#e9e9ea',
            elevation:0,
            // shadowOffset:{x:0,y:3},
            // shadowRadius:6,
        },
     
        activeTintColor:'#D43E43',
        inactiveTintColor:'#aaacae',
    }
}
)

const Tabs = createAppContainer(Tab);



export default class Profile extends Component {

    bioPicsDatabase = firebase.database().ref('bioPics'); 
    musiciansDatabase = firebase.database().ref('musicians'); 

    state = { oldpw: '', pw: '', musicianBio: '', musicianId: '', instrument: '', musicianEmail: '', accessToken: '', 
    musicianProfPic: '', ttcId: '', userId: '',  musicianName: '', errorMessage: null, bioPics: {}, firstName:'', lastName:'' , scanFlag: 0}


    componentDidMount() {
        // this.postDatabase.on('value', cars => {
        //     const carsJSON = cars.val();
        //     this.setState({ cars: carsJSON === null ? {} : carsJSON });

        // })

        this.musiciansDatabase.on('value', musicians=> {
            const musiciansJSON = musicians.val();
            // console.log(musiciansJSON);
            this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON});
          })

        const musicianId =  this.props.navigation.getParam('musicianId', 0);
        const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        const instrument = this.props.navigation.getParam('instrument', 'No data');
        const musicianBio = this.props.navigation.getParam('musicianBio', 'No data');
        const musicianEmail = this.props.navigation.getParam ('musicianEmail', 'No data');
        const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        const ttcId =  this.props.navigation.getParam('ttcId', 'No data');
        const userId =  this.props.navigation.getParam('userId', 'No data');
        const scanFlag = this.props.navigation.getParam('scanFlag', 0); // if came from scan, scanFlag = 1. Otherwise default = 0

        this.setState({musicianBio: musicianBio});
        this.setState({musicianName: musicianName});
        this.setState({musicianId: musicianId});
        this.setState({instrument: instrument});
        this.setState({musicianEmail: musicianEmail});
        this.setState({accessToken: accessToken});
        this.setState({musicianProfPic: musicianProfPic});
        this.setState({ttcId: ttcId});
        this.setState({userId: userId});
        this.setState({scanFlag: scanFlag});

        console.log("userId: " + userId);



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
        // const musicianId =  this.props.navigation.getParam('musicianId', 0);
        // const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        // const instrument = this.props.navigation.getParam('instrument', 'No data');
        // const musicianBio = this.props.navigation.getParam('musicianBio', 'No data');
        // const musicianEmail = this.props.navigation.getParam ('musicanEmail', 'No data');
        // const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        // const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');

        const picUrl = `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${this.state.musicianProfPic}?alt=media&token=${this.state.accessToken}`;

        return (

          
                

                (this.state.scanFlag === 0) ? (
                    <ScrollView>
                    <View> 
                    <Image style={{ height: 250, width: '100%' }} source={{ uri: picUrl  }} resizeMode='cover' />
                                                    
                    </View>


                    <View style={{ height: 80, backgroundColor: '#35314A', padding: 20 }}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.name} >
                                    {this.state.musicianName}
                                </Text>
                                <Text style={styles.instrument} >
                                    {this.state.instrument}
                                </Text>
                            </View>

                            <Button style={styles.DonateBtn}
                            onPress={() => this.props.navigation.navigate('Donate', { 
                                musicianId: this.state.musicianId,
                                musicianName: this.state.musicianName,
                                accessToken: this.state.accessToken ,
                                userId: this.state.userId ,
                                musicianProfPic: this.state.musicianProfPic  })}
                            >
                                <Text style={styles.donateText}>Donate</Text>
                            </Button>
                        </View>
                    </View>
                    

                    <Tabs screenProps={{ musicianId: this.state.musicianId, musicianName: this.state.musicianName, instrument: this.state.instrument, musicianBio:this.state.musicianBio, userId: this.state.userId, musicianEmail:this.state.musicianEmail}} />
                    </ScrollView> 
                ):(  

                    
                    Object.keys(this.state.musicians).map((musician) => {

                        return(

                            (JSON.stringify(this.state.musicians[musician].ttcId).slice(1,-1) === this.state.ttcId ) &&
                            <ScrollView>

                            <View> 
                            <Image style={{ height: 250, width: '100%' }} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1,-1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1,-1)}`  }} resizeMode='cover' />
                                                            
                            </View>


                            <View style={{ height: 80, backgroundColor: '#35314A', padding: 20 }}>

                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.name} >
                                            {JSON.stringify(this.state.musicians[musician].musicianName).slice(1,-1)}
                                        </Text>
                                        <Text style={styles.instrument} >
                                        {JSON.stringify(this.state.musicians[musician].instrument).slice(1,-1)}
                                        </Text>
                                    </View>

                                    <Button style={styles.DonateBtn}
                                    onPress={() => this.props.navigation.navigate('Donate', { 
                                        musicianId: JSON.stringify(this.state.musicians[musician].musicianId),
                                        musicianName: JSON.stringify(this.state.musicians[musician].musicianName).slice(1,-1),
                                        accessToken: JSON.stringify(this.state.musicians[musician].accessToken).slice(1,-1),
                                        userId: JSON.stringify(this.state.musicians[musician].userId),
                                        musicianProfPic: JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1,-1)  })}
                                    >
                                        <Text style={styles.donateText}>Donate</Text>
                                    </Button>
                                </View>
                            </View>
                            

                            <Tabs screenProps={{ musicianId: JSON.stringify(this.state.musicians[musician].musicianId), musicianName: JSON.stringify(this.state.musicians[musician].musicianName).slice(1,-1), 
                                instrument: JSON.stringify(this.state.musicians[musician].instrument).slice(1,-1), musicianBio:JSON.stringify(this.state.musicians[musician].musicianBio).slice(1,-1), 
                                userId: JSON.stringify(this.state.musicians[musician].userId), musicianEmail:JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1,-1)}} />
                            


                            </ScrollView>
                        
                        )
                    })


                )
                
          

        );
    }
}



const styles = StyleSheet.create({

    donateText: {
        color: 'white',
        fontWeight: '600'
    },
    titleContainer: {
        width: '50%',
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
        fontSize: 18,
        fontWeight: 'bold',
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        color: 'white',


    },
    instrument: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D43E43',
    }


});