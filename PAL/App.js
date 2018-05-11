
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Alert } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import AnimatedBar from "react-native-animated-bar";
import { createBottomTabNavigator } from 'react-navigation';

class App extends React.Component {
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
          centerComponent={{ text: 'Gaia', style: { color: '#fff', fontSize: 20, height: 20 } }}
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
        <FlatList style={styles.flatListContainer}
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

class MyCircleScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My Circle!</Text>
      </View>
    );
  }
}

class ReportsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ReportsScreen!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator(
  {
    Home: App,
    Report: ReportsScreen,
    MyCircle: MyCircleScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Report') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'MyCircle') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

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
  flatListContainer: {
    top: 300,
  },
  ButtonContainer: {
    top: 300,
    backgroundColor: '#424242',
  },
  itemContainer: {
    width: size,
    height: size,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 10,
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
