import React, { Component } from 'react';
import firebase from './firebase';

import { Dimensions, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { createFilter } from 'react-native-search-filter';
import { Card } from "react-native-elements";
import { SearchBar } from 'react-native-elements';
import image from '../assets/oldman.jpg'

require('firebase/auth')


var { width, height } = Dimensions.get('window');



export default class HomeScreen extends Component {

    musiciansDatabase = firebase.database().ref('musicians');
    stationsDatabase = firebase.database().ref('stations');

    state = { searchTerm: '', musicians: {}, isListVisible: false, stations: {} }




    //to get current user 
    componentDidMount() {

        this.musiciansDatabase.on('value', musicians => {
            const musiciansJSON = musicians.val();
            // console.log(musiciansJSON);
            this.setState({ musicians: musiciansJSON === null ? {} : musiciansJSON });
        })

        this.stationsDatabase.on('value', stations => {
            const stationsJSON = stations.val();
            this.setState({ stations: stationsJSON === null ? {} : stationsJSON });
        })
    }



    searchUpdated(term) {
        this.setState({ isListVisible: true });

        this.setState({ searchTerm: term })
        // console.log(term);
    }

    // toggleModal = () => {
    //     this.setState({ isModalVisible: !this.state.isModalVisible });
    // }


    render() {
        //const { currentUser } = this.state;


        const filtered = Object.keys(this.state.musicians).filter(createFilter(this.state.searchTerm, Object.keys(this.state.musicians).musicianName))
        //const filtered =  Object.keys(this.state.stations).filter(createFilter(this.state.searchTerm, Object.keys(this.state.stations).stationName))


        return (
            <View style={{ marginTop: 40 }}>



                <SearchBar
                    style={{ zIndex: 2 }}
                    onChangeText={(term) => { this.searchUpdated(term) }}
                    value={this.state.searchTerm}
                    style={styles.searchBar}
                    placeholder="Type a musician name to search"
                    platform='ios'

                // cancelButtonProps= { () => this.setState({isListVisible: false}) }

                />

                <View style={styles.genreView}>
                    <Text>Filter by Genre</Text>
                    <View style={styles.cardcontainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.minicard}>
                                <Button
                                    title="Guitar"
                                    style={styles.minicardtext}
                                    color='white'
                                    onPress={() => { this.searchUpdated('Guitar') }}
                                />
                            </View>
                            <View style={styles.minicard}>
                                <Button
                                    title="Drum"
                                    style={styles.minicardtext}
                                    color='white'
                                    onPress={() => { this.searchUpdated('Drum') }}
                                />
                            </View>
                            <View style={styles.minicard}>
                                <Button
                                    title="Accordion"
                                    style={styles.minicardtext}
                                    color='white'
                                    onPress={() => { this.searchUpdated('Accordion') }}
                                />
                            </View>
                            <View style={styles.minicard}>
                                <Button
                                    title="Violin"
                                    style={styles.minicardtext}
                                    color='white'
                                    onPress={() => { this.searchUpdated('Violin') }}
                                />
                            </View>
                            <View style={styles.minicard}>
                                <Button
                                    title="Saxophone"
                                    style={styles.minicardtext}
                                    color='white'
                                    onPress={() => { this.searchUpdated('Saxophone') }}
                                />
                            </View>
                        </ScrollView>
                    </View>

                </View>


                {

                    this.state.isListVisible ? (

                        <ScrollView style={{ height: height - 250 }}>


                            <View style={{ flex: 1 }}>

                                <Button
                                    title="Close"
                                    color="#D43E43"
                                    onPress={() => this.setState({ isListVisible: false })}
                                />


                                {

                                    (Object.keys(this.state.musicians).length == 0) ? (
                                        <Text>No Data</Text>
                                    ) : (


                                            this.state.searchTerm == 'Guitar' || this.state.searchTerm == 'Violin' || this.state.searchTerm == 'Drum' || this.state.searchTerm == 'Accordion' | this.state.searchTerm == 'Saxophone' ? (

                                                Object.keys(this.state.musicians).map((musician, j) => {
                                                    console.log("S:" + this.state.searchTerm);
                                                    console.log(JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1));
                                                    return (
                                                        (JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1) === this.state.searchTerm) && (

                                                            <TouchableOpacity key={j}
                                                                style={styles.stationItem}
                                                                onPress={() => this.props.navigation.navigate('MusicianProfile',
                                                                    {
                                                                        musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                        userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}`,
                                                                        musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}`,
                                                                        instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}`,
                                                                        musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}`,
                                                                        musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}`,
                                                                        accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`,
                                                                        musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`

                                                                    })}
                                                            >
                                                                <View style={styles.listBox} >
                                                                    <View>
                                                                        <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` }}
                                                                            style={{ width: 66, height: 66, borderRadius: 66 }}
                                                                        />


                                                                        {
                                                                            console.log(`'https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}'`)
                                                                        }

                                                                    </View>
                                                                    <View style={styles.artistList}>


                                                                        <Text style={styles.artistText}>
                                                                            {

                                                                                JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)
                                                                            }
                                                                        </Text>
                                                                        <Text style={styles.instrumentText}>
                                                                            {

                                                                                JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>


                                                        )

                                                    )
                                                })
                                            ) : (


                                                    filtered.map((musician, o) => {

                                                        return (
                                                            <TouchableOpacity key={o}
                                                                style={styles.stationItem}
                                                                onPress={() => this.props.navigation.navigate('MusicianProfile',
                                                                    {
                                                                        musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                        userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}`,
                                                                        musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}`,
                                                                        instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}`,
                                                                        musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}`,
                                                                        musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}`,
                                                                        accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`,
                                                                        musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`

                                                                    })}
                                                            >
                                                                <View style={styles.listBox} >
                                                                    <View>
                                                                        <Image source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` }}
                                                                            style={{ width: 66, height: 66, borderRadius: 66 }}
                                                                        />


                                                                        {
                                                                            console.log(`'https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}'`)
                                                                        }

                                                                    </View>
                                                                    <View style={styles.artistList}>


                                                                        <Text style={styles.artistText}>
                                                                            {

                                                                                JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)
                                                                            }
                                                                        </Text>
                                                                        <Text style={styles.instrumentText}>
                                                                            {

                                                                                JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    }


                                                    )
                                                )
                                        )

                                }




                            </View>
                        </ScrollView>

                    ) : (


                            <ScrollView style={{ height: height - 200 }}>

                                <View style={styles.ImageTextViewBox}>
                                    <Text style={styles.ImageTextTitle} >Featured</Text>
                                </View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        Object.keys(this.state.musicians).map((musician, k) => {


                                            // console.log(JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1))

                                            return (
                                                (JSON.stringify(this.state.musicians[musician].musicianId) == 1 || JSON.stringify(this.state.musicians[musician].musicianId) == 6 || JSON.stringify(this.state.musicians[musician].musicianId) == 30) && (
                                                    <View style={styles.cardView} key={k}>

                                                        <TouchableOpacity
                                                            onPress={() => this.props.navigation.navigate('MusicianProfile',
                                                                {
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}`,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}`,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}`,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}`,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`

                                                                })}>


                                                            <Image style={styles.Image} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` }}

                                                            />
                                                       



                                                            <View style={{ flex: 1, flexDirection: 'column', padding: 10, backgroundColor: '#E8E8E8', borderBottomLeftRadius:5, borderBottomRightRadius:5 }}>

                                                                <Text style={styles.textMusicianName}>
                                                                    {

                                                                        JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)

                                                                    }
                                                                </Text>
                                                                <Text style={styles.textInstrument}>
                                                                    {
                                                                        JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)
                                                                    }
                                                                </Text>

                                                            </View>

                                                        </TouchableOpacity>

                                                    </View>
                                                )
                                            )
                                        })
                                    }
                                </ScrollView>

                                <View style={styles.ImageTextViewBox}>
                                    <Text style={styles.ImageTextTitle} >Recomended</Text>
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        Object.keys(this.state.musicians).map((musician, m) => {

                                            return (
                                                (JSON.stringify(this.state.musicians[musician].musicianId) == 2 || JSON.stringify(this.state.musicians[musician].musicianId) == 7 || JSON.stringify(this.state.musicians[musician].musicianId) == 10) && (
                                                    <View style={styles.cardView} key={m}>

                                                        <TouchableOpacity
                                                            onPress={() => this.props.navigation.navigate('MusicianProfile',
                                                                {
                                                                    musicianId: `${JSON.stringify(this.state.musicians[musician].musicianId)}`,
                                                                    userId: `${JSON.stringify(this.state.musicians[musician].userId).slice(1, -1)}`,
                                                                    musicianName: `${JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)}`,
                                                                    instrument: `${JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)}`,
                                                                    musicianBio: `${JSON.stringify(this.state.musicians[musician].musicianBio).slice(1, -1)}`,
                                                                    musicianEmail: `${JSON.stringify(this.state.musicians[musician].musicianEmail).slice(1, -1)}`,
                                                                    accessToken: `${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}`,
                                                                    musicianProfPic: `${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}`

                                                                })}>

                                                            <Image resizeMode="cover" style={styles.Image} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/torontune-60f68.appspot.com/o/musicianProfPics%2F${JSON.stringify(this.state.musicians[musician].musicianProfPic).slice(1, -1)}?alt=media&token=${JSON.stringify(this.state.musicians[musician].accessToken).slice(1, -1)}` }}


                                                            />

                                                            {/* <Image resizeMode="cover" style={styles.Image} source={image}></Image> */}

                                                       



                                                            <View style={{ flex: 1, flexDirection: 'column', padding: 10,backgroundColor: '#E8E8E8', borderBottomLeftRadius:5, borderBottomRightRadius:5 }}>

                                                                <Text style={styles.textMusicianName}>
                                                                    {
                                                                        JSON.stringify(this.state.musicians[musician].musicianName).slice(1, -1)
                                                                    }
                                                                </Text>

                                                                <Text style={styles.textInstrument}>
                                                                    {
                                                                        JSON.stringify(this.state.musicians[musician].instrument).slice(1, -1)
                                                                    }
                                                                </Text>



                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>
                                                )
                                            )
                                        })
                                    }
                                </ScrollView>

                            </ScrollView>

                        )
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    genreView: {
        width: '100%',
        margin: 10,
        marginBottom: 0,
    },
    cardcontainer: {
        flexDirection: 'column',
        paddingRight: 0,

    },

    minicard: {
        width: 120,
        flex: 1,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#35314A',
        borderWidth: 1,
        borderRadius: 7,
        alignItems: 'center',
        paddingVertical: 4,
        marginBottom: 0,

    },
    minicardtext: {
        fontWeight: '600',
        fontSize: 15,
        textAlign: 'center',
    },
    ImageTextViewBox: {
        width: width - 20,
        marginHorizontal: 10,
        marginTop: 30,
        marginBottom: 5,

    },
    ImageTextTitle: {

        fontWeight: '800',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    stationItem: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        zIndex: 1
    },

    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
    },

    searchBar: {
        width: width - 20,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 0
    },
    listBox: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
        // backgroundColor: 'white',
        // borderBottomColor: 'gray',
        // borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 40,
        paddingRight: 10,

    },

    artistList: {
        width: '100%',
        marginLeft: 20,
        alignSelf: 'center'
    },

    artistText: {
        color: 'black',

        fontSize: 11,


    },
    instrumentText: {
        color: '#747474',
    },
    musicianItem: {
        alignSelf: 'center'
    },
    cardView: {
        width: width - 160,
        height: 'auto',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,
        elevation: 10,
    },
    textView: {
        width: width - 20,
        // height: '40%',
        position: 'absolute',
        bottom: 0,
        margin: 0,

    },
    Image: {
        width: width - 160,
        height: 190,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,

        // borderWidth: 2,
        // borderColor: 'black'
        // position: 'absolute',
        // translateX: 0,
        // translateY: 0,


        // left: 0,
        // right: 0,

    },
    itemTitle: {
        color: 'black',
        fontSize: 25,
        fontWeight: '600',
        paddingTop: 25,

        paddingLeft: 20,
        backgroundColor: '#E8E8E8',
    },
    itemDescription: {

        fontSize: 15,
        fontWeight: '400',



        // fontFamily: 'lato-bold',
    },
    ViewProfileStyle: {

        width: 90,
        borderRadius: 2,
        marginBottom: 5,
        color: '#FFFFFF',
        padding: 2,


    },
    textMusicianName: {
        fontWeight: 'bold', 
        paddingBottom: 5,
        fontSize: 20,

    },

    textInstrument : {
        color: '#D43E43',
        fontWeight: 'bold',
        fontSize: 16,
    }

});
