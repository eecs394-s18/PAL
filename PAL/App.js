import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, StatusBar, FlatList, Alert, Image} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDA_RXtRHQI4IlCK-M2r9wgyBMYBFgs4m4",
    authDomain: "pal394-a6f1f.firebaseapp.com",
    databaseURL: "https://pal394-a6f1f.firebaseio.com",
    projectId: "pal394-a6f1f",
    storageBucket: "",
    messagingSenderId: "33475295035"
};
var curfirebase=firebase.initializeApp(firebaseConfig);
var latfirebase=curfirebase.database().ref("/Jason/coordinates/lat");
var lngfirebase=curfirebase.database().ref("/Jason/coordinates/lng");


class App extends React.Component {
    constructor(props){
super(props)
  this.state = {
    progress: 0.5,
    opacity: 0.5,
    lat: "",
        lng: "",

  }

}

componentDidMount() {
    latfirebase.on('value', snapshot => {this.setState({lat: snapshot.val()})

    }), 
     lngfirebase.on('value', snapshot => {this.setState({lng: snapshot.val()})

    }); 
  }
   render() {

    return (

        <View style={{flex:1}}>

          <View>
            <Header
            placement="left"
            backgroundColor = "#ff1900"
            leftComponent={< ShirtStatus />}
            centerComponent={{ text: 'PAL', style: {color: '#fff', marginLeft: -30} }}
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
            <Text style={styles.statusTitle}>{"Jason's Current Status"}</Text>
            <Text style={styles.statusGreen}>Green</Text>
            <AnimatedCircularProgress
              style = {styles.semiCircleContainer}
              size={Dimensions.get('window').width-100}
              width={25}
              fill={50}
              arcSweepAngle={180}
              rotation={270}
              tintColor="green"
              backgroundColor="#666"
              onAnimationComplete={() => console.log('onAnimationComplete')}
            />
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles.face}
                source={require('./resources/f2.png')}
              />
            </View>

                    <View style={{ justifyContent: 'center', top: 175, height: 75, backgroundColor: '#e4e4e4'}}><Text style = {{textAlign: 'center'}}> Jason is at {this.state.lat}, {this.state.lng}     	
  </Text>  </View>
             		


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


class ShirtStatus extends React.Component{
  render() {
    return (
      <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-three-quarters"} size={20} color="#fff"/>
      </Text>
    );
  }
};

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
    top: 150,
  },
  ButtonContainer: {
    flex: 1,
    top: 150,
    backgroundColor: '#424242',
  },
  statusTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
  },
  statusGreen: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey',
    margin: 2,
  },
  statusGrey: {
    fontSize: 15,
    color: 'grey',
  },
  statusRed: {
    fontSize: 15,
    color: 'grey',
  },
  face: {
    width: 80,
    height: 80,
    top: 120,
  },
  semiCircleContainer : {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    top: 10,
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
