import React, { Component } from 'react';
import { Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import email from 'react-native-email'





export default class Reviews extends Component {


    handleEmail = () => {
    const to = ['torontune@gmail.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
        // bcc: 'mee@mee.com', // string or array of email addresses
        subject: 'Show how to use',
        body: 'Some body right here'
    }).catch(console.error)
}


    render() {

        console.log("musicianEmaiFromHire: " + this.props.screenProps.musicianEmail);
        console.log("musician Name: "+ this.props.screenProps.musicianName);

        return (

            <ScrollView style={styles.Container}>
                <View style={{ flexDirection: 'column' }}>

                    <View style={{
                        flexDirection: 'row', padding: 10, marginBottom: 5,
                    }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <View>
                                <Text style={styles.Contact}>
                                   Contact {this.props.screenProps.musicianName} at:
                            </Text>

                            <Text style={{marginTop: 10}}>
                                {this.props.screenProps.musicianEmail}
                            </Text>

                               

                            </View>

                            <Button style={styles.contactBtn}
                               onPress={this.handleEmail}>
                                    <Text style={styles.contactText}>Email to {this.props.screenProps.musicianName} </Text>
                            </Button>
                      
                        </View>
                        
                    </View>






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
    Contact: {
        fontSize: 19,
        fontWeight: '500',
        
    },
    contactBtn: {
        marginVertical: 50,
        backgroundColor: '#D43E43',
        fontSize: 30,
        color: '#FFFFFF',
        borderRadius: 5,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'

    },
    contactText: {
        color: 'white',
        fontWeight: '600'
    },



});