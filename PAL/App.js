import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import AnimatedBar from "react-native-animated-bar";

export default class App extends React.Component {
  state = {
    progress: 0.5,

  }
  render() {
    return (
      /* Status Bar*/
      <View>
        <View>
        <Header
          placement="left"
          backgroundColor = "#ff1900"
          leftComponent={{ icon: 'watch', color: '#fff' }}
          centerComponent={{ text: 'PAL', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
          />
        <View>
          <AnimatedBar
            progress={this.state.progress}
            height={null}
            borderColor="#DDD"
            barColor="#f18400"
            borderRadius={5}
            borderWidth={5}
            duration={500}
            >
          <View style={[styles.row, styles.center]}>
            <Text style={[styles.barText, { fontSize: 30 }]}>
              {Math.round(this.state.progress * 100)}%
            </Text>
          </View>
          </AnimatedBar>
        </View>
        </View>
        /* Details Section*/
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Icon style={styles.searchIcon} name={item.icon} size={20} color="#000" />
              <Text style={styles.item}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

const data = [
  {id: 1, name: 'Message', icon: 'comments'},
  {id: 2, name: 'So Far Today', icon: 'bar-chart'},
  {id: 3, name: 'Share', icon:'share'},
  {id: 4, name: 'Heart Rate', icon:'heart'},
  {id: 5, name: 'Send a Hug or Calming Technique'},
  {id: 6, name: 'Body Temperature', icon: 'thermometer-0'},
];
const numColumns = 3;
const size = Dimensions.get('window').width/numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 20,
  },
  item: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchIcon: {
    padding: 10,
  },
  rowText: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  barText: {
    backgroundColor: "transparent",
    color: "#FFF",
  }
});
