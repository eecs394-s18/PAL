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

import styles from './styles/home';
import ScheduleScreen from './Schedule';
import ReportsScreen from './Report';
import { GetGradient } from './gradient';

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
var addressfirebase=curfirebase.database().ref("/Jason/address");
var statusfirebase=curfirebase.database().ref("/Jason/status");
var batfirebase=curfirebase.database().ref("/Jason/battery");

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    progress: 0.5,
    opacity: 0.5,
    battery: 0.0,
    lat: "",
    lng: "",
    address: ""
    }
  }

  componentDidMount() {
    addressfirebase.on('value', snapshot => {this.setState({address: snapshot.val()})
    });
    statusfirebase.on('value', snapshot => {this.setState({progress: snapshot.val()})
    });
    batfirebase.on('value', snapshot => {this.setState({battery: snapshot.val()})
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
            <Text style={styles.statusTitle}>{"Jason's Current Status"}</Text>
            <Text style={styles.statusGreen}>Green</Text>
            <AnimatedCircularProgress
              style = {styles.semiCircleContainer}
              size={Dimensions.get('window').width-100}
              width={25}
              fill={100*this.state.progress}
              arcSweepAngle={180}
              rotation={270}
              tintColor= {GetGradient(this.state.progress)}
              backgroundColor="#666"
              onAnimationComplete={() => console.log('onAnimationComplete')}
            />
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles.face}
                source={require('./resources/f2.png')}
              />
            </View>
              <View style={{ justifyContent: 'center', top: 175, height: 75, backgroundColor: '#e4e4e4'}}>
              <Text style = {{textAlign: 'center'}}> Jason is at {this.state.address}</Text>
              </View>
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
  constructor(props){
    super(props)
    this.state = {
 
    battery: 0.0,
  
    }
  }
  componentDidMount() {
  
    batfirebase.on('value', snapshot => {this.setState({battery: snapshot.val()})
    });
  }
  renderBattery() {
    if (this.state.battery>.875) {
      return <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-full"} size={20} color="#fff"/>
      </Text>
    }
    else if (this.state.battery>.625) {
      return <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-three-quarters"} size={20} color="#fff"/>
      </Text>
    }
    else if (this.state.battery>.375) {
      return <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-half"} size={20} color="#fff"/>
      </Text>
    }
     else if (this.state.battery>.125) {
      return <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-quarter"} size={20} color="#fff"/>
      </Text>
    }
      else {
        return <Text>
        <Image
          source={require('./resources/tshirt_white.png')}
          style= {{height: 20, width: 20}}
        />
        <Icon name={"battery-empty"} size={20} color="#fff"/>
      </Text>
      }
    


  }
  render() {
    return (
            <View >
     {this.renderBattery()}
        </View>

    );
  }
};


export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    Report: ReportsScreen,
    Schedule: ScheduleScreen,
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
        else if (routeName === 'Schedule') {
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
  {id: 2, name: 'History', icon: 'bar-chart'},
  {id: 3, name: 'Share', icon:'share'},
  {id: 4, name: 'Heart Rate', icon:'heart'},
  {id: 5, name: 'Send a Hug or Calming Technique'},
  {id: 6, name: 'Body Temperature', icon: 'thermometer-0'},
];
const numColumns = 3;
