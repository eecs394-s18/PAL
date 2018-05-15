import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, StatusBar, FlatList, Alert } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

class App extends React.Component {
  state = {
    progress: 0.5,
    opacity: 0.5,
  }

  render() {
    return (

        <View style={{flex:1}}>

          <View>
            <Header
            placement="left"
            backgroundColor = "#ff1900"
            leftComponent={{ icon: 'watch', color: '#fff' }}
            centerComponent={{ text: 'PAL', style: { color: '#fff' } }}
            rightComponent={{ icon: 'menu', color: '#fff' }}
            />
          <View>
              <CalendarStrip
                  calendarAnimation={{type: 'parallel', duration: 30}}
                  daySelectionAnimation={{type: 'background', duration: 200, highlightColor: '#D2D2D2'}}
                  style={{height:80, paddingTop: 2, paddingBottom:12, marginTop: -1,}}
                  calendarHeaderStyle={{color: 'white'}}
                  calendarColor={'#7B7B7B'}
                  dateNumberStyle={{color: 'white'}}
                  dateNameStyle={{color: 'white'}}
                  iconContainer={{flex: 0.08}}
              />
            <AnimatedCircularProgress
              style = {styles.semiCircleContainer}
              size={Dimensions.get('window').width-30}
              width={25}
              fill={90}
              arcSweepAngle={180}
              rotation={270}
              tintColor="green"
              backgroundColor="#666"
              onAnimationComplete={() => console.log('onAnimationComplete')}
            />
          </View>
          </View>
          <FlatList style={styles.flatListContainer}
              data={data}
              renderItem={({item}) => (
                <TouchableHighlight onPress={() => {}}
                  activeOpacity={this.state.opacity}
                  underlayColor="#fff">
                  <View style={styles.itemContainer}>
                    <Icon style={styles.searchIcon} name={item.icon} size={20} color="#000" />
                    <Text style={styles.item}>{item.name}</Text>
                  </View>
                </TouchableHighlight>
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
        <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
            style={{height:100, paddingTop: 20, paddingBottom: 10}}
            calendarHeaderStyle={{color: 'white'}}
            calendarColor={'#7743CE'}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
        />
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
    flex: 1,
    top: 300,
  },
  ButtonContainer: {
    flex: 1,
    top: 300,
    backgroundColor: '#424242',
  },
  semiCircleContainer : {
    flex: 1,
    margin: 15,
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
