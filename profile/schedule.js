import React, { Component } from 'react';
import { Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import firebase from '../pages/firebase';






export default class Reviews extends Component {

    scheduleDatabase = firebase.database().ref('schedules'); 

    state = { currentUser: null, schedules: {}}

    


    //to get current user 
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        this.scheduleDatabase.on('value', schedules=> {
            const schedulesJSON = schedules.val();
            this.setState({ schedules: schedulesJSON === null ? {} : schedulesJSON});
          })
    }


    render() {
        console.log("id: " + this.props.screenProps.userId);

        return (

            <ScrollView style={styles.Container}>
                <View style={{ flexDirection: 'column' }}>

                {                   
                    Object.keys(this.state.schedules).map((schedule) => {
                                    
                        return(

                            Object.keys(this.state.schedules[schedule].performingSchedule).map((perform, k) => {
                                        
                                return(

                                    (JSON.stringify(this.state.schedules[schedule].performingSchedule[perform].artistId) === this.props.screenProps.musicianId) && (


                                        Object.keys(this.state.schedules[schedule].performingSchedule[perform].shifts).map((shift, l) => {
                                        
                                            return(
                                                                

                                                <View style={{
                                                    flexDirection: 'row', padding: 10, marginBottom: 10, borderWidth: 0.5, borderColor: 'rgba(0,0,2, 0.8)', borderRadius: 4
                                                }}>

                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                                        <View style={{ flex: 6, }}>
                                                            <Text>
                                                                Playing {this.props.screenProps.instrument}
                                                        </Text>



                                                            <Text>
                                                            Expected from {this.state.schedules[schedule].performingSchedule[perform].shifts[shift].timeFrom} : 00 to {this.state.schedules[schedule].performingSchedule[perform].shifts[shift].timeUntil} : 00
                                                            </Text>

                                                            <Text>
                                                                At {JSON.stringify(this.state.schedules[schedule].stationName).slice(1, -1) }
                                                        </Text>

                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: "#35314A", width: 50, height: 50, }}>

                                                            <Text style={{color: 'white'}}>{this.state.schedules[schedule].performingSchedule[perform].shifts[shift].day.slice(0, 3)}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            )
                                        })
                                    )
                                )
                            })
                        )
                    })
                }      


                </View>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    name: {

        fontSize: 16,
        fontWeight: '600',
        padding: 10,




    },

    img: {

        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'flex-start',


    },

    review: {

        fontSize: 15,
        paddingLeft: 10,
        flexShrink: 1
    },

    textArea: {
        flex: 4,
        height: 90,
        justifyContent: "flex-start",
        borderColor: 'grey',
        borderWidth: 0.4,
        padding: 8,
        marginLeft: 10,
        borderRadius: 10
    }


});