import React, { Component } from 'react';
import { Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, Image, ScrollView, TextInput , Alert} from 'react-native';
import defaultPic from '../assets/default.png';
import firebase from '../pages/firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Reviews extends Component {

    reviewsDatabase = firebase.database().ref('reviews'); 
    userProfPicsDatabase = firebase.database().ref('userProfPics'); 
    usersDatabase = firebase.database().ref('user');

    state = { currentUser: null, userId: '', users: {}, reviews: {}, userProfPics: {}, musicianReview: ''} 


    componentDidMount() {
        const user = firebase.auth().currentUser;
        

        if (user) {
            const currentUser = user.uid;
            this.setState({ currentUser: currentUser});
   
        } else {
            console.log("not logged in");
        }


        this.setState({userId: this.props.screenProps.userId}); //musician userId

        this.reviewsDatabase.on('value', reviews=> {
            const reviewsJSON = reviews.val();
            this.setState({ reviews: reviewsJSON === null ? {} : reviewsJSON});
          })

        this.userProfPicsDatabase.on('value', userProfPics=> {
        const userProfPicsJSON = userProfPics.val();
        this.setState({ userProfPics: userProfPicsJSON === null ? {} : userProfPicsJSON});
        })

        this.usersDatabase.on('value', users=> {
            const usersJSON = users.val();
            this.setState({ users: usersJSON === null ? {} : usersJSON});
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
        
                    
        this.reviewsDatabase.push({
            review: this.state.musicianReview,
            musicianUserId: this.state.userId, 
            reviewer: this.state.currentUser,
            date:　month + ' / ' + day + ' / ' + year
           
        }) .then(
            Alert.alert(  
                'Success!',  
                "Reiview submitted.",  
                [  
                    {text: 'OK', onPress: () => console.log('review submitted')},  
                
                ],  
                {cancelable: false}  
            )  
            
        
        )

        .catch(error => this.setState({ errorMessage: error.message }))

       
    };




    render() {

        console.log("musician_userId FromHire: " + this.props.screenProps.userId);
        console.log("musician Name: "+ this.props.screenProps.musicianName);


        return (

            <ScrollView style={styles.Container}>
                <View style={{ flexDirection: 'column' }}>

                    <View style={{
                        flexDirection: 'row', padding: 10, marginBottom: 5,
                    }}>

                        
                      
                        <TextInput
                            style={styles.textArea}
                            onChangeText={(musicianReview) => this.setState({ musicianReview })}
                            underlineColorAndroid="transparent"
                            placeholder="Write Review.."
                            placeholderTextColor="grey"
                            numberOfLines={6}
                            multiline={true}
                        />
                        <KeyboardSpacer/>


                    </View>

                    <View style={{ flexDirection: 'column', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10,  }}>


                    <Button style={styles.postBtn}
                         onPress={this.postReview}
                    >
                            <Text style={styles.postBtnText}>Add Review</Text>
                        </Button>
                    </View>
                    {

                        (Object.keys(this.state.reviews).length == 0 ) ? (
                            <Text>NO REVIEW</Text>

                        ): (   
                            Object.keys(this.state.reviews).map((review) => {
                                return(

                       
                                    
                                    (this.props.screenProps.userId == JSON.stringify(this.state.reviews[review].musicianUserId).slice(1,-1)) && ( 


                                        Object.keys(this.state.users).map((user) => {
                                            return(
            
                                                (JSON.stringify(this.state.reviews[review].reviewer).slice(1,-1) == JSON.stringify(this.state.users[user].userId).slice(1,-1)) && ( 

                                                    <View style={{
                                                        flexDirection: 'row', padding: 10, borderBottomColor: 'grey',
                                                        borderBottomWidth: 0.2, marginBottom: 10
                                                    }}>
                                                        <View style={{ flex: 1 }}>
                                                        {
                                                            (JSON.stringify(this.state.users[user].profPicUrl).slice(1,-1) != "" ) ? (
                                                                            
                                                                            
                                                            <Image style={styles.img} source={{uri: JSON.stringify(this.state.users[user].profPicUrl).slice(1,-1)}} resizeMode="cover"></Image>
                                                            
                                                            ):(
                                                                <Image style={styles.img} source={defaultPic} resizeMode="cover"></Image>
                                                            )
                                                        }
                                                        </View> 
                                                        <View style={{ flexDirection: 'column', flex: 4, marginBottom: 10 }}>

                                                           
                                                        
                                                            <Text style={styles.name}>{JSON.stringify(this.state.users[user].firstName).slice(1,-1)} {JSON.stringify(this.state.users[user].lastName).slice(1,-1)}</Text>
                                                        
                        
                                                            <Text style={styles.review}>{JSON.stringify(this.state.reviews[review].review).slice(1,-1)}</Text>
                                                        </View>
                                                    </View> 
                                                )
                                            )
                                        })
                                        
                                    )
                                
                                  
                                
                                       

                                        
                                    
                                )
                                
                            })
                    
                        )
                    }

                    

                            

                   
                </View>


                {/* (Object.keys(this.state.bioPics).length == 0) ? (
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
 */}






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
        borderColor: 'rgba(0,0,2, 0.8)',
        borderWidth: 0.5,
        padding: 8,
        marginLeft: 10,
        borderRadius: 10
    
    },postBtn: {
        paddingHorizontal: 20,
        backgroundColor: '#D43E43',
        color: '#ffffff'
    },
    postBtnText: {
        color: '#fff',
    }
    


});