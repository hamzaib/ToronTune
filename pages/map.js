import React, { Component, Constants } from 'react';
import firebase from './firebase';

import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
// import { Searchbar } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';


require('firebase/auth')


const KEYS_TO_FILTERS = ['stationName'];
const { width, height } = Dimensions.get('window')



export default class MapScreen extends Component {

    stationsDatabase = firebase.database().ref('stations'); 

    state = { currentUser: null, searchTerm: '', stations: {}} 

    //to get current user 
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        this.stationsDatabase.on('value', stations=> {
            const stationsJSON = stations.val();
            this.setState({ stations: stationsJSON === null ? {} : stationsJSON});
          })
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
        console.log(term);
    }

    render() {

        const { currentUser } = this.state;
         const filtered =  Object.keys(this.state.stations).filter(createFilter(this.state.searchTerm, Object.keys(this.state.stations).stationName))
    
    
        return (
            <View>
                <SearchBar 
                style={{zIndex: 2}}
                value = {this.state.searchTerm}
                onChangeText={(term) => { this.searchUpdated(term) }} 
                style={styles.searchBar}
                placeholder="Type a station name to search"
                platform = 'ios'
                />
                
                <ScrollView style={{height: height -120}}>
                {


                    (Object.keys(this.state.stations).length == 0) ? (
                    <Text>No Data</Text>
                    ):(
                        filtered.map((station, index) =>{
                           
                           

                            return (
                            <TouchableOpacity key={index} 
                                style={styles.stationItem}
                                onPress={() => this.props.navigation.navigate('MapSearchResult', { stationId: `${JSON.stringify(this.state.stations[station].stationId)}`, stationName: `${JSON.stringify(this.state.stations[station].stationName).slice(1, -1)}` })}
                            >
                                <View>
                                <Text>
                                    {
                                    `${JSON.stringify(this.state.stations[station].stationName).slice(1, -1)}`    
                                    }
                                </Text>
                            
                                </View>
                            </TouchableOpacity>
                            )}
                        

                        )
                    )
                }
                </ScrollView>
            </View>
            );
        }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    stationItem:{
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 20
    },
   
    searchInput:{
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
    },

    searchBar: {
        width: width -20,
        marginLeft:10,
        marginTop:10,
        borderRadius:0
    }

});