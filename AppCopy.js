import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, } from 'react-navigation-stack';
import { fromLeft, zoomIn, flipX, flipY } from 'react-navigation-transitions';
import React, { Component } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
require('firebase/auth')

import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';


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
      headerBackTitle: 'Back',    // Title back button Back to Home from Donate
    },
  },
  MapSearchResult: {
    screen: MapToMusicianProfileStack,
    navigationOptions: ({ navigation }) => ({         
      title: 'Map',
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
    }),
  },
  DonateConfirm: {
    screen: DonateConfirm,
    navigationOptions: ({ navigation }) => ({         
      title: 'Donate',
    }),
  },
  DonateInput: {
    screen: DonateInput,
    navigationOptions: ({ navigation }) => ({         
      title: 'Donate',
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
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
       <Layout />
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
      />
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
];