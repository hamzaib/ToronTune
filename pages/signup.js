
import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, StackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from './firebase';
require('firebase/auth')






export default class LoginScreen extends Component {

    state = { email: '', password: '', errorMessage: null, users: {}, firstName:'', lastName:'' }

  
    
    handleSignUp = () => {


        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredential => {
            console.log("profPic : "  + firebase.auth().currentUser.profPicUrl);

            //set data into User database - if is 0 = musician / 1 = general 
            firebase.database().ref('user' + "/" + userCredential.user.uid).set({
                userId: firebase.auth().currentUser.uid, flag: 1, userEmail: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, profPicUrl: ''
            }) .then(() =>  this.props.navigation.navigate('App'))
            .catch(error => this.setState({ errorMessage: error.message }))
        })
       
    }


    render() {


        return (
            <ScrollView>
            <View style={styles.container}>
            <Text style={styles.SignupTitle}>Signup
                                  
                               </Text>
                           <Form>
                               <Item floatingLabel>
                                   <Label>First Name</Label>
                                   <Input
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       onChangeText={firstName => this.setState({ firstName })}
                                   />
                               </Item>
                               <Item floatingLabel>
                                   <Label>Last Name</Label>
                                   <Input
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       onChangeText={lastName => this.setState({ lastName })}
                                   />
                               </Item>
                               <Item floatingLabel>
                                   <Label>Email</Label>
                                   <Input
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       onChangeText={email => this.setState({ email })}
                                   />
                               </Item>
                               <Item floatingLabel>
                                   <Label>Password</Label>
                                   <Input
                                       secureTextEntry={true}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       onChangeText={password => this.setState({ password })}
                                   />
                               </Item>
                               <Button style={styles.signupButton} onPress={this.handleSignUp} full  >
                                   <Text style={styles.signupText}>SIGNUP</Text>
                               </Button>
           
                               <Text style={{ fontSize: 18, textAlign: 'center', width: '100%', marginTop: 20 }}>Already have an Account? 
                                   <Text style={{ color: '#D43E43',  marginLeft: 40 }} onPress={() => this.props.navigation.navigate('Login')}> Login</Text>
                               </Text>
                           </Form>
                       </View>
                       </ScrollView>
                   );
               }
           }
           
           const styles = StyleSheet.create({
               container: {
                   flex: 1,
                   paddingHorizontal: 20,
                   paddingVertical: 100,
                   justifyContent: "flex-start"
           
               },
           
               signupButton: {
                   backgroundColor: '#35314A',
                   fontSize: 30,
                   marginTop: 90,
                   color: '#FFFFFF',
                   borderRadius: 5
           
               },
           
               signupText: {
                   color: 'white',
                   fontWeight: '600'
               },
           
               SignupTitle:{
                   fontSize: 30, 
                   textAlign: 'left', 
                   width: '100%', 
                   marginTop: 20,
                   marginLeft: 10
               }
           })
           