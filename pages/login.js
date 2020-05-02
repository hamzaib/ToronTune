import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Item, Form, Input, Button, Label} from "native-base";
import firebase from './firebase';
import Logo from '../assets/torontune.png';



export default class LoginScreen extends Component {
    
    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('App'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

   

    render() {

        return (
            <ScrollView ref="myScrollView">
                <View style={styles.container}>

                    <View style={styles.logo}>

                <Image style={{ width: 150,
                        height: 50, alignSelf: "center", marginTop: 50}} source={Logo} resizeMode="contain"/>
                </View>

                
                    <Form style={{paddingTop: 50}}>
                    <Text style={styles.SigninTitle}>Log in
                        
                        </Text>
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
                    

                        <Text style={{fontSize: 18, width:'100%', textAlign:'center', marginTop:30}}>
                            <Text style={{color: '#000000', fontSize: 14}} onPress={() => this.props.navigation.navigate('Signup')}> Forgot Password?</Text>
                        </Text>
                        <Button onPress={this.handleLogin} full style={styles.signinButton}>
                            <Text style={styles.signinText}>LOGIN</Text>
                        </Button>
                        <Text style={{fontSize: 18, width:'100%', textAlign:'center', marginTop:20}}>Don't have an Account?
                            <Text style={{color: '#D43E43'}} onPress={() => this.props.navigation.navigate('Signup')}> Signup</Text>
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
        paddingVertical: 50,
        justifyContent: "flex-start"

    },
    signinButton: {
        backgroundColor: '#D43E43',
        fontSize: 30,
        marginTop: 50,
        color: '#FFFFFF',
        borderRadius: 5,
       
    },

    signinText: {
        color: 'white',
        fontWeight: '600',
       
    },

    SigninTitle:{
        fontSize: 30, 
        textAlign: 'left', 
        width: '100%', 
        marginTop: 20,
        marginLeft: 10
    }
})
