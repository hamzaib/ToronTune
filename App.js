import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, } from 'react-navigation-stack';
import { fromLeft, zoomIn, flipX, flipY } from 'react-navigation-transitions';
require('firebase/auth')

import HomeScreen from './pages/explore';
import ScanScreen from './pages/scan';
import MapScreen from './pages/map';
import LoginScreen from './pages/login';
import Signup from './pages/signup';
import SettingScreen from './pages/settings';
import DonateScreen from './pages/donate';
import DonateConfirmScreen from './pages/donateConfirm';
import DonateInputScreen from './pages/donateInput';
import MapResultScreen from './pages/mapResult';
import MusicianProfScreen from './pages/profile';
import SettingModalScreen from './pages/settingModal';
import DonateSuccessScreen from './pages/donateSuccess';
import ScanInputScreen from './pages/scanInput';

const TabBarIcon = (props) => {
    const { image, navigation } = props;
    return(
        <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => navigation.navigate(navigation.state.routeName)}
        >
            <Image style={{width: 25, height: 25}}
                   source={image}/>
        </TouchableOpacity>
    );
  };
  
  
  // Switch Navigator
  // const AuthNavigator = createSwitchNavigator(
  //   {
  //     Login: LoginScreen
  //   },
  //   {
  //     initialRouteName: 'Login'
  //   }
  // );
  
  const AuthNavigator = createSwitchNavigator(
    {
      Login: LoginScreen,
      Signup: Signup,
      // Profile: { screen: Profile },
      Home: HomeScreen,
    },
    {
      initialRouteName: 'Login'
    }
  );
  
  
  const MapToMusicianProfileStack = createStackNavigator({
    MapSearchResult: {
      screen: MapResultScreen,
      navigationOptions: {
        headerBackTitle: 'Back',    // Title back button Back to Home from Donate
      },
    },
    MusicianProfile: {
      screen: MusicianProfScreen,
      navigationOptions: ({ navigation }) => ({         
        header: null,
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  
  });
  
  
  const MapResult = createStackNavigator({
    Map: {
      screen: MapScreen,
      navigationOptions: {
       
        headerTitleStyle: { color: '#000000' }
        
      },
    },
    MapSearchResult: {
      screen: MapToMusicianProfileStack,
      navigationOptions: ({ navigation }) => ({         
        title: 'Map',
        headerTintColor: '#D43E43',
        headerTitleStyle: { color: '#000000' }
       
       
      }),
    },
  }, {
    headerMode: 'screen',
  
  });
  
  
  const ScanInputToMusicianProfile = createStackNavigator({
    ScanInput: {
      screen: ScanInputScreen,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
    MusicianProfile: {
      screen: MusicianProfScreen,
      navigationOptions: ({ navigation }) => ({         
        title: 'Musician Profile',
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });
  
  
  
  const ScanToMusicianProfile = createStackNavigator({
    Scan: {
      screen: ScanScreen,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
    MusicianProfile: {
      screen: MusicianProfScreen,
      navigationOptions: ({ navigation }) => ({         
        title: 'Musician Profile',
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });
  
  
  const ScanInputNavigator = createStackNavigator({
    Scan: {
      screen: ScanToMusicianProfile,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
    ScanInput: {
      screen: ScanInputToMusicianProfile,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });
  
  
  
  
  const DonateSuccessNavigator = createStackNavigator({
    DonateConfirmation: {
      screen: DonateConfirmScreen,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
    DonateDone: {
      screen: DonateSuccessScreen,
      navigationOptions: ({ navigation }) => ({         
        header: null
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });
  
  
  
  
  const DonateConfirm = createStackNavigator({
    Donate: {
      screen: DonateScreen,
      navigationOptions: {
        headerBackTitle: 'Back',    
      },
    },
    DonateConfirmation: {
      screen: DonateSuccessNavigator,
      navigationOptions: ({ navigation }) => ({         
        title: 'Donate',
      }),
    },
  }, {
    headerMode: 'none',
  });
  
  const DonateInput = createStackNavigator({
    DonateCustomize: {
      screen: DonateInputScreen,
      navigationOptions: {
        headerBackTitle: 'Back',    
      },
    },
    DonateConfirmation: {
      screen: DonateSuccessNavigator,
      navigationOptions: ({ navigation }) => ({         
        title: 'A',
      }),
    },
  }, {
    headerMode: 'none',
  });
  
  
  
  
  
  
  const DonateNavigator = createStackNavigator({
    MusicianProfile: {
      screen: MusicianProfScreen,
     
      navigationOptions: ({ navigation }) => ({         
        title: 'Musician Profile',
        headerTitleStyle: { color: '#000000' },
      }),
    },
    DonateConfirm: {
      screen: DonateConfirm,
    
      navigationOptions: ({ navigation }) => ({         
        title: 'Donate',
        headerTintColor: '#D43E43',
        headerTitleStyle: { color: '#000000' },
      }),
    },
    DonateInput: {
      screen: DonateInput,
      navigationOptions: ({ navigation }) => ({         
        title: 'Donate',
        headerTintColor: '#D43E43',
        headerTitleStyle: { color: '#000000' }
      }),
    },
  }, {
  
    headerMode: 'screen',
  });
  
  const SettingModalNavigator = createStackNavigator({
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        headerBackTitle: 'Back',    // Title back button Back to Home from Donate
      },
    },
    Modal: {
      screen: SettingModalScreen,
      navigationOptions: ({ navigation }) => ({         
       
      }),
    },
    MusicianSelfProfile: {
      screen: MusicianProfScreen,
      navigationOptions: ({ navigation }) => ({         
       
      }),
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  
  });
  
  
  const MusicianProfNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerBackTitle: 'Back',    // Title back button Back to Home from Donate
      },
    },
    MusicianProfile: {
      screen: DonateNavigator,
      navigationOptions: ({ navigation }) => ({         
        title: 'Musician Profile',
      }),
    },
  }, {
    headerMode: 'none',
  
  });
  
  
  
  
  
  
  // Tab Navigator
  const HomeNavigator = createBottomTabNavigator(
    {
      Home: { 
        screen: MusicianProfNavigator,
        navigationOptions: ({navigation}) => {
          return {
            tabBarOptions: { 
              activeTintColor: '#D43E43',
              inactiveTintColor: 'black',
              },
            tabBarLabel: "Explore",
            tabBarIcon:({focused}) => (
              <TabBarIcon navigation={navigation}
              image={ focused ? require('./assets/home27-red.png') 
                  : require('./assets/home27-black.png')}
                  />
            )
          }
        }
      
      },
      Map: { screen: MapResult, 
        navigationOptions: ({navigation}) => {
          return {
            tabBarOptions: { 
              activeTintColor: '#D43E43',
              inactiveTintColor: 'black',
              },
              tabBarLabel: "Map",
            tabBarIcon:({focused}) => (
              <TabBarIcon navigation={navigation}
              image={ focused ? require('./assets/map27-red.png') 
                  : require('./assets/map27-black.png')}
                  />
            )
          }
        }
      },
      Scan: {screen: ScanInputNavigator,
        navigationOptions: ({navigation}) => {
          return {
            tabBarOptions: { 
              activeTintColor: '#D43E43',
              inactiveTintColor: 'black',
              },
            tabBarLabel: "Scan",
            tabBarIcon:({focused}) => (
              <TabBarIcon navigation={navigation}
              image={ focused ? require('./assets/scan27-red.png') 
                  : require('./assets/scan27-black.png')}
                  />
            )
          }
        },
      
      
      },
      // Settings: { screen: MusicianPagefView },
      Settings: {screen: SettingModalNavigator,
  
        navigationOptions: ({navigation}) => {
          return {
            tabBarOptions: { 
            activeTintColor: '#D43E43',
            inactiveTintColor: 'black',
            },
            tabBarLabel: "Profile",
            tabBarIcon:({focused}) => (
              <TabBarIcon navigation={navigation}
              image={ focused ? require('./assets/profile27-red.png') 
                  : require('./assets/profile27-black.png')}
                  />
            )
          }
        },
      
      },
  
    },
    {
      initialRouteName: 'Home',
       
  
    }
  )
  
  const image = require('./assets/logout.png')
  
  
  const createRootNavigator = () => {
    return createStackNavigator (
  
      
      {
        Auth: {
          screen: AuthNavigator,
          navigationOptions: {
            header: null,
          },
        },
  
        App: {
          screen: HomeNavigator,
          navigationOptions: {
            header: null,
          },
        }
  
  
      },
  
  
      {
        initialRouteName: 'Auth', // which screen / navigations stack to begin with 
        transitionConfig: () => fromLeft(), 
  
        
      }
    
    );
  }
  
  // app entry point
  const Layout = createAppContainer(createRootNavigator(true));





export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
            //To show the main page of the app
        };
    }

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.bg,
        }}>
        <SafeAreaView style={styles.slide}>
        <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </SafeAreaView>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  _onSkip = () => { 
    this.setState({ showRealApp: true });
  };

  render() {


    if (this.state.showRealApp) {
        //Real Application
        return (
         <Layout />
        );
      } else {
        //Intro slides
        return (
            <View style={{flex: 1}}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
              keyExtractor={this._keyExtractor}
              activeDotStyle={{backgroundColor:'rgba(53,49,74,1)'}} //purple
              dotStyle={{backgroundColor:'rgba(212,62,67,1)'}} //red
              renderItem={this._renderItem } 
              onDone={this._onDone}       
              showSkipButton
              onSkip={this._onSkip}
              showPrevButton
              data={data}
            />
          </View>
        );
      }
    
  }
}

const data = [
  {
    title: 'SCHEDULE',
    image: require('./assets/intro-schedule.png'),
    description: 'View all musician’s schedules and never miss out on the live performance of your favourite musician.',
    bg: 'white',
  },
  {
    title: 'DONATE',
    image: require('./assets/intro-donate.png'),
    description: 'Show some love by encouraging and donating your favourite musicians. Supporting locals can go along way. ',
    bg: 'white',
  },
  {
    title: 'FEEDBACK',
    image: require('./assets/intro-feedback.png'),
    description: 'Add and view reviews by simply logging in. Showing support by writing kind words can bring musicians smile and confidence.',
    bg: 'white',
  },
  {
      title: 'HIRE',
      image: require('./assets/intro-contact.png'),
      description: 'Hire talented artists by finding them through scanning their ID, name or station. View their profile and contact them. ',
      bg: 'white',
    },
];

  
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
    paddingTop:20,
  },
  whiteBox:{
    flex:1,
    backgroundColor:'white',
  },
  image: {
    width: 270,
    height:270,
    marginTop: -20,
    alignContent:'center',
    
  },
  title: {
    fontSize: 35,
    fontWeight:"700",
    color: '#35314A',
    textAlign: 'center',
    marginTop:50,
  },
  description: {
    fontSize: 16,
    color: '#35314A',
    textAlign: 'center',
    marginTop:32,
    marginBottom:100,
    paddingHorizontal:50,
    lineHeight:24,
  },
  

});
  