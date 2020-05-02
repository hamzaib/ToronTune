import * as React from 'react';
import {Text,View,StyleSheet,Button,Alert, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from './firebase';
import enterIcon from '../assets/enterIcon.png';

import {
  BarCodeScanner
} from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {

  musiciansDatabase = firebase.database().ref('musicians'); 

  state = { hasCameraPermission: null, scanned: false, id: '', musicians: {}, musicianBio: '', musicianEmail: '', musicianId: '', musicianId: '', musicianName: '',
  musicianProfPic: '', accessToken: '', userId: '', instrument: '' };
  
  async componentDidMount() {
   
    this.getPermissionsAsync();

    this.musiciansDatabase.on('value', musicians=> {
      const musiciansJSON = musicians.val();
      // console.log(musiciansJSON);
      this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON});
    })
  }

  getPermissionsAsync = async() => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  handleBarCodeScanned  = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    this.setState({id:data})

  //   {

  //     Object.keys(this.state.musicians).map((musician) => {

  //     return(

  //       this.state.id === JSON.stringify(this.state.musicians[musician].ttcId).slice(1,-1) && 
  //         this.setState({ 
  //           musicianId: JSON.stringify(this.state.musicians[musician].musicianId),
  //           userId: JSON.stringify(this.state.musicians[musician].userId).slice(1, -1),
  //           musicianName: JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1),
  //           instrument: JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1),
  //           musicianBio: JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1) ,
  //           musicianEmail: JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1) ,
  //           accessToken: JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1) ,
  //           musicianProfPic: JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)
          
          
          
  //         })



          
  //     )

  //   })
  // }
     

    // }
    
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      Alert.alert(  
        'Show Musician Info',  
        data,  
        [  
            {text: 'OK', onPress: () => this.props.navigation.navigate('MusicianProfile', 
            { ttcId: data,
              scanFlag: 1
           })
            
          
          },  
          
        ],  
        {cancelable: false}  
    )  
  };



  render() {
    const { hasCameraPermission, scanned } = this.state;



    
    
    if (hasCameraPermission === null) {
      return <Text> Requesting
      for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }

    return ( 
      <View style = {
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }
      } >

        <View style={styles.box}></View>
       
      <
      BarCodeScanner onBarCodeScanned = {
        scanned ? undefined : this.handleBarCodeScanned
      }
      style = { StyleSheet.absoluteFillObject} />

      <TouchableOpacity 
        style={{width: '100%', height: 120, backgroundColor: '#ffffff', position: 'absolute', top: 0}} 
        resizeMode="cover"
        onPress={() => this.props.navigation.navigate('ScanInput') }
        
         >
        <View style={styles.inputBtn}>
          <Image style={{width: 30, height: 30, margin: 2, alignSelf: 'center', marginRight: 20}} resizeMode="cover" source={enterIcon} />
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#35314A'}}>ENTER MUSICIAN ID</Text>
        </View>
      
      </TouchableOpacity>


      {
        scanned && ( 

          


          <Button title = {
            'Tap to Scan'
          }
          onPress = {
            () => this.setState({
              scanned: false
            })
          }
          />

         

        )

       

      } 
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  inputBtn:{
    flex: 1,
    marginHorizontal: 40,
    marginTop: 50,
    flexDirection: 'row',

  },
  box: {
      width: '100%',
      backgroundColor: 'pink',
      height: 20
      
  },
})