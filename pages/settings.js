import React, { Component } from 'react';
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer } from 'react-navigation'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


import defaultPic from '../assets/default.png';
import rightArrow from '../assets/right-arrow.png';
import firebase from './firebase';

require('firebase/auth')

export default class Settings extends Component {

    usersDatabase = firebase.database().ref('user'); 
    musiciansDatabase = firebase.database().ref('musicians');
    userProfPicDatabase = firebase.database().ref('userProfPic'); 
   

    state = {currentUser: null, photoURL: null, users: {}, musicians: {}, userProfPics: {}, image: null}

    componentDidMount(){


        this.getPermissionAsync();
    

        // const { currentUser } = firebase.auth();
        // const { uid } = firebase.auth().currentUser.uid;
        // console.log("c:"+ currentUser);
        // console.log("u:"+ uid);

            const user = firebase.auth().currentUser;


            // firebase.auth().onAuthStateChanged(user => {
            //     if (user) {
            //         const currentUser = user.uid;
            //         const photoURL = user.photoURL;

            //         this.setState({ currentUser: currentUser});
            //         this.setState ({photoURL: photoURL})
            //     } else {
            //         navigate('Login');
            //     }
            //   });
        

            if (user) {
           
            const currentUser = user.uid;
            const photoURL = user.photoURL;

            this.setState({ currentUser: currentUser});
            this.setState ({photoURL: photoURL})

            console.log("photoUrl: " + photoURL)
            
       
            } else {
                console.log("not logged in");
            }


    
       
        this.usersDatabase.on('value', users=> {
          const usersJSON = users.val();
          this.setState({ users: usersJSON === null ? {} : usersJSON});
        })
    
        this.musiciansDatabase.on('value', musicians=> {
          const musiciansJSON = musicians.val();
          this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON});
        })

        this.userProfPicDatabase.on('value', userProfPics=> {
            const userProfPicsJSON = userProfPics.val();
            this.setState({ userProfPics: userProfPicsJSON === null ? {} : userProfPicsJSON});
          })
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Auth');
        } catch (e) {
            console.log(e);
        }
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
        
        
  
    
        if (!result.cancelled) {
          //this.setState({ image: result.uri });

        //   console.log("currentUser? " + this.state.currentUser);


            const localUri = await fetch(result.uri);
            const localBlob = await localUri.blob();

            


            var storageRef = firebase.storage().ref().child("generalProfPic/" + this.state.currentUser);

            const putTask = storageRef.put(localBlob);

            putTask.on('state_changed', (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({
                    progress: parseInt(progress) + "%",
                });
            }, (error) => {
                console.log(error);
                alert("fail upload");
            }, () => {
                putTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log(downloadURL);
                    

                   // create new database store profile picture
                    // firebase.database().ref('userProfPic' + "/" + this.state.currentUser).set({
                    //     userId: this.state.currentUser, profPicUrl: downloadURL
                    // }) .then(() =>  console.log("Upload and create database success!"))

                    // .catch(error => this.setState({ errorMessage: error.message }))

                    

                    const user = firebase.auth().currentUser;
                    user.updateProfile({
                    photoURL: downloadURL
                    }).then(function() {

                        console.log('auth user photo updated')
                       
                        
                    // Update successful.
                    }).catch(function(error) {
                        console.log("fail");
                    });

                    this.setState({
                        progress: '',
                        image: downloadURL,
                        photoURL: downloadURL
                    });


                     // create new database store profile picture
                     firebase.database().ref('user' + "/" + this.state.currentUser).update({
                        "profPicUrl": downloadURL
                    }) .then(() =>  console.log("update success!"))

                    .catch(error => this.setState({ errorMessage: error.message }))



                })
            })



        }
      };


    render(){

        let { image } = this.state;

        return (

            <ScrollView>

               
                    {


                        (Object.keys(this.state.users).length == 0) ? (
                            <Text>No Data</Text>
                        ):(

                        Object.keys(this.state.users).map((user) => { //Musician

                            return(
                            

                                (this.state.currentUser === JSON.stringify(this.state.users[user].userId).slice(1,-1) && JSON.stringify(this.state.users[user].flag) )&& (
                                 
                                
                                    (JSON.stringify(this.state.users[user].flag) == 0 ) ? (

                                        Object.keys(this.state.musicians).map((musician, index) => {

                                            return(


                                                this.state.currentUser === JSON.stringify(this.state.musicians[musician].userId).slice(1,-1) && (
                                                    <View key={index}>
                                                        <View style={styles.headerContainer}>

                                                            <View style={styles.listBox} >
                                                                <View>

                                                                    <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`  }}
                                                                        style={{ width: 66, height: 66, borderRadius: 66/2 }}
                                                                    />
                                                                </View>
                                                                <View style={styles.titleContainer}>
                                                                
                                                                    <View style={styles.nameContainer}>
                                                                        <View>
                                                                            <Text style={styles.name}>  
                                                                            {
                                                                                
                                                                                JSON.stringify(this.state.users[user].firstName).slice(1, -1)
                                                                            }
                                                                            
                                                                            </Text> 
                                                                        </View>
                                                                        <View>
                                                                            <Text style={styles.name}>  
                                                                            {
                                                                                
                                                                                JSON.stringify(this.state.users[user].lastName).slice(1, -1)
                                                                            }
                                                                            </Text> 
                                                                        </View>
                                                                    </View>
                                                                    
                                                                    <Text style={styles.email}>  
                                                                    {
                                                                        
                                                                        JSON.stringify(this.state.users[user].userEmail).slice(1, -1)
                                                                    }
                                                                    </Text> 
                                                                </View>
                                        
                                                                
                                                            </View>
                                                        </View>
                                                        <View style={styles.bodyContainer}>
                                                                <Text style={{fontSize: 21, fontWeight: 'bold', marginLeft: 30, marginVertical: 20}}>  
                                                                Personal Information
                                                                </Text> 
                                                                <View 
                                                                    style={styles.itemContainer}
                                                                    // onPress={() => this.props.navigation.navigate('MapSearchResult')}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                           TTC ID
                                                                        </Text> 
                                                                        <Text style={{marginLeft: 'auto' , fontSize: 16,fontWeight: 'bold'}}>  
                                                                        {
                                                                        
                                                                        JSON.stringify(this.state.musicians[musician].ttcId).slice(1, -1)
                                                                        }
                                                                        </Text> 
                                                                     
                                                                    

                                                                    </View>
                                                                </View>

                                                                <TouchableOpacity 
                                                                    style={styles.itemContainer}
                                                                    onPress={() => this.props.navigation.navigate('Modal', { edit: 1, 
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}` ,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}` ,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}` ,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}` ,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` ,
                                                                    ttcId: `${JSON.stringify(this.state.musicians[musician].ttcId).slice(1, -1)}` ,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}` ,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`  })}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                            Change Password
                                                                        </Text> 
                                                                        <Image source={rightArrow}
                                                                        style={{ width: 15, height: 15,marginLeft: 'auto' }}
                                                                    />

                                                                    </View>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity 
                                                                    style={styles.itemContainer}
                                                                    onPress={() => this.props.navigation.navigate('Modal',  { edit: 2, 
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}` ,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}` ,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}` ,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}` ,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` ,
                                                                    ttcId: `${JSON.stringify(this.state.musicians[musician].ttcId).slice(1, -1)}` ,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}` ,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`  })}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                            View Donate History
                                                                        </Text> 
                                                                        <Image source={rightArrow}
                                                                        style={{ width: 15, height: 15,marginLeft: 'auto' }}
                                                                    />

                                                                    </View>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity 
                                                                    style={styles.itemContainer}
                                                                    onPress={() => this.props.navigation.navigate('Modal',  { edit: 3, 
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}` ,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}` ,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}` ,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}` ,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` ,
                                                                    ttcId: `${JSON.stringify(this.state.musicians[musician].ttcId).slice(1, -1)}` ,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}` ,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`  })}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                        Edit Biography
                                                                        </Text> 
                                                                        <Image source={rightArrow}
                                                                    
                                                                            style={{ width: 15, height: 15, marginLeft: 'auto'}}
                                                                        />

                                                                    </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity 
                                                                    style={styles.itemContainer}
                                                                    onPress={() => this.props.navigation.navigate('Modal' ,  { edit: 4, 
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}` ,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}` ,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}` ,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}` ,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` ,
                                                                    ttcId: `${JSON.stringify(this.state.musicians[musician].ttcId).slice(1,-1)}` ,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}` ,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`  })}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                        Edit Gallery
                                                                        </Text> 
                                                                        <Image source={rightArrow}
                                                                    
                                                                            style={{ width: 15, height: 15, marginLeft: 'auto'}}
                                                                        />

                                                                    </View>
                                                                </TouchableOpacity>
                                                            
                                                                <TouchableOpacity
                                                                    style={styles.stationItem}
                                                                    onPress={() => this.props.navigation.navigate('MusicianSelfProfile', 
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
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                        View your Page
                                                                        </Text> 
                                                                        <Image source={rightArrow}

                                                                            style={{ width: 15, height: 15, marginLeft: 'auto'}}
                                                                        />
                                                                </View>
                                                                </TouchableOpacity>
                                                                
                                                        </View>  
                                                        <View style={styles.bb}>
                                                            <TouchableOpacity
                                                                style={styles.button}
                                                                onPress={this.signOutUser}
                                                            >
                                                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>SIGN OUT</Text>
                                                            </TouchableOpacity>
                                                        </View>           
                                                    </View>
                                                    
                                                    
                                                )
                                            )
                                        })

                                    ) : ( //if the user is general

                                        // this.state.currentUser === JSON.stringify(this.state.musicians[musician].userId).slice(1,-1) && (

                                           
    
    
                                                    <View>
                                                        <View style={styles.headerContainer}>

                                                            <View style={styles.listBox} >
                                                                <View>

                                                                
                                                                {         
                                                    
                                                                    this.state.photoURL ? (
                                                                    
                                                                    
                                                                        <Image source={{uri: this.state.photoURL } }
                                                                        style={{ width: 66, height: 66, borderRadius: '50%' }}
                                                                        />
                                                                                
                                                                            
                                                                        ):(
                                                                        <Image source={defaultPic }
                                                                        style={{ width: 66, height: 66, borderRadius: '50%' }}
                                                                        />
                                                                    )
                                                                }           
                                                                




                                                                    <Button 
                                                                        color="#ffffff"
                                                                        title="Edit"
                                                                        onPress={this._pickImage}
                                                                    />
                                                                </View>
                                                                <View style={styles.titleContainer}>
                                                                
                                                                    <View style={styles.nameContainer}>
                                                                        <View>
                                                                            <Text style={styles.name}>  
                                                                            {
                                                                                
                                                                                
                                                                                JSON.stringify(this.state.users[user].firstName).slice(1, -1)
                                                                            }

                                                                            
                                                                            </Text> 
                                                                        </View>
                                                                        <View>
                                                                            <Text style={styles.name}>  
                                                                            {
                                                                                
                                                                                JSON.stringify(this.state.users[user].lastName).slice(1, -1)
                                                                            }
                                                                            </Text> 
                                                                        </View>
                                                                    </View>
                                                                    
                                                                    <Text style={styles.email}>  
                                                                    {
                                                                        
                                                                        JSON.stringify(this.state.users[user].userEmail).slice(1, -1)
                                                                    }
                                                                    </Text> 
                                                                </View>
                                        
                                                                
                                                            </View>
                                                        </View>
                                                        <View style={styles.bodyContainer}>
                                                                <Text style={{fontSize: 21, fontWeight: 'bold', marginLeft: 30, marginVertical: 20}}>  
                                                                Personal Information
                                                                </Text> 

                                                                <TouchableOpacity 
                                                                    style={styles.itemContainer}
                                                                    onPress={() => this.props.navigation.navigate('Modal', { edit: 1, 
                                                                    })}
                                                                >
                                                                    <View style={styles.item}>

                                                                        <Text>  
                                                                            Change Password
                                                                        </Text> 
                                                                        <Image source={rightArrow}
                                                                        style={{ width: 15, height: 15,marginLeft: 'auto' }}
                                                                    />

                                                                    </View>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity 
                                                                            style={styles.itemContainer}
                                                                            onPress={() => this.props.navigation.navigate('Modal',  { edit: 2, 
                                                                             })}
                                                                        >
                                                                            <View style={styles.item}>

                                                                                <Text>  
                                                                                    View Donate History
                                                                                </Text> 
                                                                                <Image source={rightArrow}
                                                                                style={{ width: 15, height: 15,marginLeft: 'auto' }}
                                                                            />

                                                                            </View>
                                                                        </TouchableOpacity>

                                                                
                                                        </View>  
                                                        <View style={styles.bb}>
                                                            <TouchableOpacity
                                                                style={styles.button}
                                                                onPress={this.signOutUser}
                                                            >
                                                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>SIGN OUT</Text>
                                                            </TouchableOpacity>
                                                        </View>         
                                                    </View>
                                              
                                        // )

                                    )




                                        
                                )  
                            )
                        })

                        )
                    }
                    
                            
                            
                        
                    
                
               




            </ScrollView>

        )
    }
}



const styles = StyleSheet.create({

    headerContainer:{
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        height: 200, 
        backgroundColor: '#35314A', 
        paddingLeft: 30,
        paddingTop: 100,
        paddingBottom: 60


    },
    userHead:{
        paddingRight: 30,
        // alignSelf: 'center', 
    },
    
    donateText: {
        color: 'white',
        fontWeight: '600'
    },
    listBox:{
        flex: 1,
        flexDirection: 'row',
    },

    titleContainer: {
        paddingTop: 10,
        paddingLeft: 20, 
       
    },
    nameContainer:{
     
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
       
    },
   
    
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        paddingRight: 10,


    },
    email:{

        fontSize: 16,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#D43E43',
        paddingRight: 10,
    },

    instrument: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D43E43',
    },
    item:{
        flex: 1,
        flexDirection: 'row',
        borderColor: '#C3C3C3',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        
    },
    itemContainer:{
        flex: 1,
        flexDirection: 'row',

    },
    bb:{
        backgroundColor: '#35314A',
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 20,
    }


});