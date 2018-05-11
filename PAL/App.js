import React, { Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header
          placement="left"
          backgroundColor = "#ff1900"
          leftComponent={{ icon: 'watch', color: '#fff' }}
          centerComponent={{ text: 'PAL', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
          />
        <Text>PAL</Text>
        <Text>By Orange Team</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
