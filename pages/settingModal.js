import React, { Component } from 'react';
import firebase from './firebase';
import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView,TextInput, Alert } from 'react-native';
import HeaderButton from '../assets/cancel.png';
import binBtn from '../assets/bin.png';
import AddBtn from '../assets/add.png';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


require('firebase/auth')

var {width, height} = Dimensions.get('window');

export default class SettingModalScreen extends Component {

    usersDatabase = firebase.database().ref('user'); 
    musiciansDatabase = firebase.database().ref('musicians');
    bioPicsDatabase = firebase.database().ref('bioPics'); 
    donateDatabase = firebase.database().ref('donations'); 

    state = { currentUser: null, fileName: '', oldpw: '', pw: '', image: '', phothoUrl: '', musicianBio: '', musicianId: '', instrument: '', musicianEmail: '', accessToken: '', 
    musicianProfPic: '', ttcId: '', userId: '',  musicianName: '', errorMessage: null, users: {}, bioPics: {}, musicians: {},firstName:'', lastName:'' , donations: {}}


    
   
    componentDidMount() {
       
        this.getPermissionAsync();

        const musicianId =  this.props.navigation.getParam('musicianId', 0);
        const musicianName= this.props.navigation.getParam('musicianName', 'No data');
        const instrument = this.props.navigation.getParam('instrument', 'No data');
        const musicianBio = this.props.navigation.getParam('musicianBio', 'No data');
        const musicianEmail = this.props.navigation.getParam ('musicianEmail', 'No data');
        const accessToken = this.props.navigation.getParam ('accessToken', 'No data');
        const musicianProfPic = this.props.navigation.getParam ('musicianProfPic', 'No data');
        const ttcId =  this.props.navigation.getParam('ttcId', 'No data');
        const userId =  this.props.navigation.getParam('userId', 'No data');

        this.setState({musicianBio: musicianBio});
        this.setState({musicianName: musicianName});
        this.setState({musicianId: musicianId});
        this.setState({instrument: instrument});
        this.setState({musicianEmail: musicianEmail});
        this.setState({accessToken: accessToken});
        this.setState({musicianProfPic: musicianProfPic});
        this.setState({ttcId: ttcId});
        this.setState({userId: userId});

        //console.log("musicianBio: " + musicianBio);


        const user = firebase.auth().currentUser;
        

        if (user) {
        // console.log("logged in: " + user.uid);

        const currentUser = user.uid;
       

        this.setState({ currentUser: currentUser});
      
        // console.log("c: "+ currentUser);
   
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


        this.bioPicsDatabase.on('value', bioPics=> {
            const bioPicsJSON = bioPics.val();
            this.setState({ bioPics: bioPicsJSON === null ? {} : bioPicsJSON});
        })

        
        this.donateDatabase.on('value', donations=> {
            const donationsJSON = donations.val();
            this.setState({ donations: donationsJSON === null ? {} : donationsJSON});
        })
         

    }

       
    

    changePW = () => {
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        console.log("email " + JSON.stringify(user))

            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;  



               if(email == this.state.oldpw) {

                // var newPassword = getASecureRandomPassword();

                user.updatePassword(this.set.pw).then(function() {

                    Alert.alert(  
                        'Success!',  
                        "Password has changed",  
                        [  
                            {text: 'OK', onPress: () => console.log('password has changed')},  
                        
                        ],  
                        {cancelable: false}  
                    )  
                    


                // Update successful.
                }).catch(function(error) {
                // An error happened.
                });

               }

               


            } else {
          
            }
                
    };


    changeBio = () => {

        let TargetString = JSON.stringify(this.state.musicianName).slice(1,-1).replace(/\s+/g, "");
        TargetString = TargetString.slice( 0, 1 ).toLocaleLowerCase() + TargetString.slice( 1 ) ;
        console.log("target: "+ TargetString);
        console.log("bio: "+ this.state.musicianBio);
        // console.log("token: "+ this.state.accessToken);
        // console.log("instrument: "+ this.state.instrument);
        // console.log("musicianEmail: "+ this.state.musicianEmail);
        // console.log("musicianId: "+ this.state.musicianId);
        // console.log("musicianName: "+ this.state.musicianName);
        // console.log("musicianProfPic: "+ this.state.musicianProfPic);
        // console.log("userId: "+ this.state.userId);
        // console.log("ttc: "+ this.state.ttcId);
                    
        firebase.database().ref('musicians' + "/" + TargetString).set({
            accessToken: this.state.accessToken, 
            instrument: this.state.instrument, 
            musicianBio: this.state.musicianBio, 
            musicianEmail: this.state.musicianEmail,
            musicianId: this.state.musicianId,
            musicianName: this.state.musicianName,
            musicianProfPic: this.state.musicianProfPic,
            userId: this.state.userId, 
            ttcId: this.state.ttcId,
        }) .then(
            Alert.alert(  
                'Success!',  
                "Biography is updated",  
                [  
                    {text: 'OK', onPress: () => console.log('Ask me later pressed')},  
                
                ],  
                {cancelable: false}  
            )  
            
        
        )

        .catch(error => this.setState({ errorMessage: error.message }))

       
    };



    // create() {
    //     this.postDatabase
    //         .push('Yesterday At 2PM' )
    // }

    
    //Delete 

    deletePic (url) {

        console.log("delete: " + "musicianProfPics/" + this.state.currentUser+ "/" + url );
        let fileNameDeleteLocate =  url.lastIndexOf(".");
        // console.log("fileNameDeleteLocate: "+fileNameDeleteLocate);
        let fileNameDelete = url.substring(0, fileNameDeleteLocate); //Only file name without format (jpg/ png)
        console.log("fileNameDelete: "+fileNameDelete); 

        var picRef = firebase.storage().ref().child("musicianProfPics/" + this.state.currentUser+ "/" + url );
        picRef.delete().then(function() {


            let userRef = firebase.database().ref('bioPics' + "/" + fileNameDelete);
            userRef.remove()

            Alert.alert(  
                'Success!',  
                "Picture is deleted.",  
                [  
                    {text: 'OK', onPress: () => console.log('picture is deleted!')},  
                
                ],  
                {cancelable: false}  
            ) 
        }).catch(function(error) {
         
        });




    }

    isEmailValid = () => {
        let email = this.state.email
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
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
      this.setState({ image: result.uri });
      console.log("result: "+ result.uri);
       let originalName = result.uri.lastIndexOf("/");
    //    console.log("originalName: "+　originalName);
       
        let picFN= result.uri.substring(originalName + 1); // file name
        console.log("picFN: "+picFN);
        originalName = picFN.lastIndexOf(".");
        console.log("originalName: "+　originalName);
        let picN = picFN.substring(0, originalName); //Only file name without format (jpg/ png)
        console.log("picN: "+picN); 


      this.setState({fileName: picFN});



        const localUri = await fetch(result.uri);
      
        const localBlob = await localUri.blob();

        

        var storageRef = firebase.storage().ref().child("musicianProfPics/" + this.state.currentUser+ "/" + picFN );

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
                console.log("downloadURL" +downloadURL);
                

                //create new database store images 
                firebase.database().ref('bioPics' + "/" + picN).set({
                    userId: this.state.currentUser, bioPicUrl: downloadURL, fileName:picFN
                }) .then(() =>  
                    Alert.alert(  
                        'Success!',  
                        "Picture is uploaded",  
                        [  
                            {text: 'OK', onPress: () => console.log('picture is uploaded!')},  
                        
                        ],  
                        {cancelable: false}  
                    )  
                )

                .catch(error =>  console.log("fail")　)


                this.setState({
                    progress: '',
                    image: downloadURL,
                });




            })
        })



     }
  };

//   timestampToDate = (timestamp) => {
//     console.log("timestamp: "+ timestamp);
//     var d = new Date(timestamp).toDateString;
//     console.log(d)
//     return (d.getMonth()+1) +' / '+ d.getDate() + ' / ' + d.getFullYear();

//   }




    render() {
        const { goBack } = this.props.navigation;
        const {params} =  this.props.navigation.state;

        const { musicianBio } = this.state;
        // console.log(JSON.stringify(params.edit) );
        // console.log(JSON.stringify(params.musicianName) );
        // console.log(this.state.musicianBio);
        

        return (
          <View style={styles.container}>
              <TouchableOpacity 
              activeOpacity={0.5}
              onPress={() => goBack()}
              style={styles.closeBtn}
              >
                <Image
                source={HeaderButton}
                style={{width:15, height: 15}}
                />
               
            </TouchableOpacity>
            
           

            
            
                {

                (JSON.stringify(params.edit) == 1) && (
            
                    <View style={styles.header}>
                    
                        <View >
                        <Text style={styles.headerText}> Change Password</Text>
                       
                       </View>
                        <View
                        style={{
                            // backgroundColor: value,
                            borderBottomColor: '#000000',
                            borderBottomWidth: 1,
                            marginVertical: 50,
                            marginHorizontal: 20,
                            width: width - 80,

                           

                        }}>
                        <TextInput
                           style={styles.textInput}
                           onChangeText={oldpw => this.setState({ oldpw })}
                           
                            // value={this.state.value}
                            editable
                            maxLength={40}
                            placeholder = 'Old Password'
                        />
                       
                        </View>
                        <View
                        style={{
                            // backgroundColor: value,
                            borderBottomColor: '#000000',
                            borderBottomWidth: 1,
                            marginVertical: 30,
                            marginHorizontal: 20,
                            width: width - 80,
                           

                        }}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={pw => this.setState({ pw })}
                            // value={this.state.value}
                            editable
                            maxLength={40}
                            placeholder = 'New Password'
                        />
                       
                        </View>

                        <View style={styles.bb}>
                            <TouchableOpacity
                                onPress={this.changePW}
                            >
                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>Change Password</Text>
                            </TouchableOpacity>
                        </View>         
                    
                    </View>

                )
            }
                
            {

                (JSON.stringify(params.edit) == 2) && (
                  
                    <View style={styles.header}>
                    
                        <View >
                        <Text style={styles.headerText}>Donate History</Text>
                    
                        </View>

                        

                            <View style={styles.historyBody}>
                            {
                                Object.keys(this.state.donations).map((donate, d) => {
                                    return(

                                    
                                        (JSON.stringify(this.state.donations[donate].payer).slice(1,-1) === this.state.currentUser) && (

                                        
                                                <View style={styles.borderBox}>
                                                    
                                                      
                                                        <View>

                                                            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 5}}>

                                                                {JSON.stringify(this.state.donations[donate].date).slice(1,-1)}
                                                                
                                                            </Text>
                                                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D43E44', marginVertical: 5}}>

                                                                {JSON.stringify(this.state.donations[donate].musicianName).slice(1,-1)}

                                                            </Text>
                                                        </View>
                                                        <View style={styles.amount}>
                                                            <Text style={{fontSize: 30, fontWeight: 'bold'}}>$ {JSON.stringify(this.state.donations[donate].amount)}</Text>
                                                        </View>
                                                 


                                                </View>

                                        
                                        
                                        
                                        )
                                        
                                    )
                                })

                            }
                            </View>
                        
                  

                    </View>

                   
            )
                

            }
                
            {
                (JSON.stringify(params.edit) == 3) && (
                
                    <View style={styles.header}>
                    
                        <View >
                        <Text style={styles.headerText}>Edit Biography</Text>
                    
                        </View>
                        <View
                        style={{
                            // backgroundColor: value,
                           borderColor: '#000000',
                           borderWidth: 0.5,
                            marginVertical: 30,
                            marginHorizontal: 20, 
                            paddingVertical: 10,
                            width: width - 80,
                            height: 300,
                        
                        }}>
                        <TextInput
                            style={styles.biotextInput}
                            onChangeText={(musicianBio) => this.setState({ musicianBio })}
                            multiline
                            numberOfLines={10}
                            value={this.state.musicianBio}
                            editable
                        
                            placeholder = 'Write your bio'
                        />
                       
                        </View>

                        <View style={styles.bb}>
                            <TouchableOpacity
                                onPress={this.changeBio}
                            >
                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>         
                                
                    </View>
                  

                )
            }
            {

                (JSON.stringify(params.edit) == 4) && (
                    
                    <View style={styles.header}>
                    
                        <View >
                        <Text style={styles.headerText}>Edit Gallery</Text>
                    
                        </View>
                    
                        <View style={{ flexDirection: 'column', marginTop: 15, marginLeft: -5 }}>
                        
                            <View style={{flexDirection: 'row', flexWrap: 'wrap',marginTop: 5, }}>

                                {

                               

                                    Object.keys(this.state.bioPics).map((pic, index) => {
                                        //console.log("URL" + JSON.stringify(this.state.bioPics[pic].bioPicUrl));
                                    
                                        return(
                                            // <Image style={{width: '48%', height: 130, margin: 2}} resizeMode="cover" source={Profile1} />
                                            (JSON.stringify(this.state.bioPics[pic].userId).slice(1,-1) === this.state.userId) && (
                                                <TouchableOpacity 
                                                    style={{width: '48%', height: 130, margin: 2, position:'relative'}} 
                                                    resizeMode="cover"
                                                    onPress={() => this.deletePic(JSON.stringify(this.state.bioPics[pic].fileName).slice(1, -1)) }
                                                    
                                                >
                                                    <Image style={{width: '100%', height: 130, margin: 2}} resizeMode="cover" source={{uri: `${JSON.stringify(this.state.bioPics[pic].bioPicUrl).slice(1, -1)}`}} />
                                                    <Image style={{width: 30, height: 30, position: 'absolute', right: 5, top: 5}} source={binBtn} />
                                             </TouchableOpacity>
                                            )

                                            
                                        )
                                    })
                                
                
                                }
                                
                           
                                <TouchableOpacity 
                                    style={{width: '48%', height: 130, margin: 2, backgroundColor: '#DDDDDD'}} 
                                    resizeMode="cover" 
                                    onPress={this._pickImage}
                                >
                                <Image style={{width: 50, height: 50, alignSelf: 'center', padding: 2, marginVertical: '25%'}} source={AddBtn} />
                                </TouchableOpacity>

                               
                                
                            
                            </View>

                        </View>
                    </View>
                        
                    

                ) 
            }
                       
            {/* <Button
              onPress={() => goBack()}
              title="Close Me"
            /> */}
          </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        
    },
    header:{
        width: '100%',
       marginHorizontal: 20,
      
    },

    headerText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textInput:{
       paddingBottom: 10,
       fontSize: 16,

    },
    biotextInput: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
 
    },
  

    closeBtn:{
        marginTop: 60,
        marginLeft: 'auto',
        
    },
    wrap:{
        marginTop: 50,
    },
    button:{
        width: width - 90,
        marginBottom: 15,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#35314A',
        // borderRadius:10,
        // borderWidth: 1,
        // borderColor: '#fff'
      },
      btnText:{
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
      },
      bb:{
        backgroundColor: '#35314A',
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 20,
       
    },
    historyBody:{
        marginVertical: 50,
    },

    borderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#C3C3C3',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    amount: {
       
       alignSelf: 'center',
    }
    

});