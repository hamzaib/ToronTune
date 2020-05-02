import React from 'react';
import { Dimensions, StyleSheet, Button, Text, View, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import firebase from './firebase';




var {width} = Dimensions.get('window');



export default class MapResultScreen extends React.Component {

  schedulesDatabase = firebase.database().ref('schedules'); 
  musiciansDatabase = firebase.database().ref('musicians');

  


 
  


  state = {schedules: {}, musicians: {}, date: '', hour: '', minute:'', second: '', dayOfWeek:'', dayOfWeekStr: '', url: ''}

  componentDidMount(){

    this.schedulesDatabase.on('value', schedules=> {
      const schedulesJSON = schedules.val();
      this.setState({ schedules: schedulesJSON === null ? {} : schedulesJSON});
    })

    this.musiciansDatabase.on('value', musicians=> {
      const musiciansJSON = musicians.val();
      this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON});
    })

     

    const date = new Date () ;

    const hour = date.getHours() ;
    const minute = date.getMinutes() ;
    const second = date.getSeconds() ;
    const dayOfWeek = date.getDay() ;
    const dayOfWeekStr = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][dayOfWeek] ;
    
    this.setState({hour: hour, minute: minute, second: second, dayOfWeek: dayOfWeek, dayOfWeekStr: dayOfWeekStr});
  

    
  }


  render() {
    const stationId =  this.props.navigation.getParam('stationId', 0);
    const stationName= this.props.navigation.getParam('stationName', 'No data')
    return (
      <View style={styles.container}>
        
         <Text style={styles.titleText}>
                                
            {stationName} Musicians :
            </Text> 

           
            <ScrollView style={styles.scrollContainer}>

          {

           
            Object.keys(this.state.schedules).map((schedule, index) => {
              return(
                
                (JSON.stringify(this.state.schedules[schedule].stationId) === stationId) && (
                    
                  Object.keys(this.state.schedules[schedule].performingSchedule).map((perform, i) => {
                    return(
                      Object.keys(this.state.musicians).map((musician, j) => {
                        return(
                          (JSON.stringify(this.state.schedules[schedule].performingSchedule[perform].artistId) === (JSON.stringify(this.state.musicians[musician].musicianId))) && (

                            <TouchableOpacity key={index}
                            style={styles.stationItem}
                            onPress={() => this.props.navigation.navigate('MusicianProfile', 
                            { musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                            userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}` ,
                            musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}` ,
                            instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}` ,
                            musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}` ,
                            musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}` ,
                            accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` ,
                            musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}` 
                            
                            })}
                        >

                                <View   style={styles.listBox} >
                    
                                
                                   <View>
                                    <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`  }}
                                      style={{ width: 66, height: 66, borderRadius: '50%' }}
                                    />


                                    {
                                      console.log(`'https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}'` )
                                    }

                                  </View>
                                  <View style={styles.artistList}>
                                    <View style={styles.musicianItem}>

                                      <Text style={styles.artistText}>  
                                        {
                                            
                                            JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)
                                        }
                                      </Text> 
                                      <Text style={styles.instrumentText}>  
                                        {
                                            
                                            JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)
                                        }
                                      </Text> 


                                    </View>
                                    <View>
                                  

                                  {
                                     Object.keys(this.state.schedules[schedule].performingSchedule[perform].shifts).map((shift, k) => {
                                      return(
                                      (JSON.stringify(this.state.schedules[schedule].performingSchedule[perform].shifts[shift].dayNum) == this.state.dayOfWeek && JSON.stringify(this.state.schedules[schedule].performingSchedule[perform].shifts[shift].timeFrom) <= this.state.hour && JSON.stringify(this.state.schedules[schedule].performingSchedule[perform].shifts[shift].timeUntil) > this.state.hour)&&(
                                        <Text style={styles.performNow}>
                                      
                                      Performing Now
                                      </Text> 
                                      )
                                      )})
                                  }
                                    </View>
                                 
                                  </View>
                                </View>

                              </TouchableOpacity>
                            
                          )
                             
                           
                         
                      )})
                    )})
                    
                )
              )
            }
        
           )              
          }
          </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     
    },
    scrollContainer:{
       marginTop: 10,
        width: '100%',
    },
    titleText: {
      color: 'black', 
      marginTop: 50,
      marginLeft: 20, 
      fontWeight: 'bold', 
      fontSize: 18,

    },
    artistText: {
      color: 'black', 
      fontWeight: 'bold',
      fontSize: 16,


    },
    instrumentText: {
      color: '#747474',
    },

    textInput: {
        backgroundColor: '#ddca6c',
        height: 30,
        width: '100%',
    },

    bottomContainer:{
      backgroundColor: '#93c8f2',
      borderStyle: "solid",
      height: 85,
      width: width,
      alignItems: 'center',
    },
    createListInput: {
        backgroundColor: '#fff',
        borderStyle: "solid",
        borderColor: '#3a2995',
        height: 50,
        width: width - 100,
        paddingLeft: 10,     
    },
   
    listBox: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight:10,   

    },

    artistList: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      marginLeft: 20,
    },

    btnText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
    },

    performNow: {
      color: 'white', 
      width: 120, 
      backgroundColor: '#D43E43', 
      textAlign: 'center',
      paddingBottom: 10,
      paddingTop: 10,
      marginLeft: 20,
      

    },
    musicianItem: {
      alignSelf: 'center'
    }
});

