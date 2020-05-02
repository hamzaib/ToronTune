import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { Searchbar } from 'react-native-paper';

const { width, height } = Dimensions.get('window')

 class SearchHome extends React.Component {
  state = {
    firstQuery: '',
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }); }}
        value={firstQuery}
        style = {{width: width -20,marginLeft:10,marginTop:10,borderRadius:0,}}
      />
    );
  }
}

export default SearchHome;