import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, StatusBar, FlatList, Alert, AlertIOS, Image} from 'react-native';
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
import Modal from 'react-native-modal';
import Slider from "react-native-slider";

import { openMap } from 'react-native-open-map';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDA_RXtRHQI4IlCK-M2r9wgyBMYBFgs4m4",
  authDomain: "pal394-a6f1f.firebaseapp.com",
  databaseURL: "https://pal394-a6f1f.firebaseio.com",
  projectId: "pal394-a6f1f",
  storageBucket: "pal394-a6f1f.appspot.com",
  messagingSenderId: "33475295035"
};
var name, email,  uid, emailVerified;
var latfirebase,lngfirebase, addressfirebase, statusfirebase, batfirebase, namefirebase, userfirebase, HeartRatefirebase, temperaturfirebase, meltdownfirebase;
var curfirebase=firebase.initializeApp(firebaseConfig);

namefirebase=curfirebase.database().ref("/Jason/name"); 
addressfirebase=curfirebase.database().ref("/Jason/address");
statusfirebase=curfirebase.database().ref("/Jason/status");
batfirebase=curfirebase.database().ref("/Jason/battery");
HeartRatefirebase=curfirebase.database().ref("/Jason/HeartRate");
temperaturfirebase=curfirebase.database().ref("/Jason/temperature");
meltdownfirebase=curfirebase.database().ref("/Jason/meltdown");
latfirebase=curfirebase.database().ref("/Jason/coordinates/lat");
lngfirebase=curfirebase.database().ref("/Jason/coordinates/lng");
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    //signed in, gets users info
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
    userfirebase=curfirebase.database().ref("/Users/")
    //checks if the current account exists in the database
    userfirebase.once('value', function(snapshot) {
      if (snapshot.hasChild(uid)) {
        //do nothing if in database
      }
      else {
        //if not in database create new data
        curfirebase.database().ref('/Users/' + uid).set({
         "HeartRate" : 80,
         "address" : "2240 Campus Drive, Evanston",
         "battery" : 0.2,
         "coordinates" : {
          "lat" : 42.05819462388442,
          "lng" : -87.6740707988094
        },
        "meltdown" : {
          "time" : "",
          "value" : 3
        },
        "name" : "Jason",
        "password" : 123456,
        "status" : 0.5,
        "temperature" : 98.2
      });
      }

    });
    //  now that we have confirmed whether the account is in database under users/UID (or we made a new entry we can pull from the USERS UID
    addressfirebase=curfirebase.database().ref("/Users/"+uid+"/address");
    statusfirebase=curfirebase.database().ref("/Users/"+uid+"/status");
    batfirebase=curfirebase.database().ref("/Users/"+uid+"/battery");
    namefirebase=curfirebase.database().ref("/Users/"+uid+"/name");
    HeartRatefirebase=curfirebase.database().ref("/Users/"+uid+"/HeartRate");
    temperaturfirebase=curfirebase.database().ref("/Users/"+uid+"/temperature");
    meltdownfirebase=curfirebase.database().ref("/Users/"+uid+"/meltdown");
    latfirebase=curfirebase.database().ref("/Users/"+uid+"/coordinates/lat");
    lngfirebase=curfirebase.database().ref("/Users/"+uid+"/coordinates/lng");


  } else {
      //initalize with Jasons values if user doesnt exist
      addressfirebase=curfirebase.database().ref("/Jason/address");
      statusfirebase=curfirebase.database().ref("/Jason/status");
      batfirebase=curfirebase.database().ref("/Jason/battery");

      namefirebase=curfirebase.database().ref("/Jason/name"); 
      HeartRatefirebase=curfirebase.database().ref("/Jason/HeartRate");
      temperaturfirebase=curfirebase.database().ref("/Jason/temperature");
      meltdownfirebase=curfirebase.database().ref("/Jason/meltdown");
      latfirebase=curfirebase.database().ref("/Jason/coordinates/lat");
      lngfirebase=curfirebase.database().ref("/Jason/coordinates/lng");

    }
  });

class HomeScreen extends React.Component {
  constructor(props){
//     var curfirebase=firebase.initializeApp(firebaseConfig);
// var addressfirebase=curfirebase.database().ref("/Jason/address");
// var statusfirebase=curfirebase.database().ref("/Jason/status");
// var batfirebase=curfirebase.database().ref("/Jason/battery");
super(props)
this.state = {
  parentLocation: null,
  progress: 0.5,
  statusColor: "#6fd865",
  statusEmoji: require("./resources/smile.png"),
  statusDesc: "not bad",
  opacity: 0.5,
  battery: 0.0,
  currentUser: null, 
  childLat: "",
  childLng: "",

  address: "",
  visibleModal: null,
  sliderValue: 0,
  kidname: "",
  meltdownTime: "",
  meltdownVal: 0,
  HeartRate: 70,
  temperature: 98.6
}
}

componentDidMount() {


 namefirebase.on('value', snapshot => {this.setState({kidname: snapshot.val()})
});   
 latfirebase.on('value', snapshot => {this.setState({childLat: snapshot.val()})
});
 lngfirebase.on('value', snapshot => {this.setState({childLng: snapshot.val()})
});

 addressfirebase.on('value', snapshot => {this.setState({address: snapshot.val()})
});
 statusfirebase.on('value', snapshot => {
   this.setState({progress: snapshot.val()});
   this._updateStatus(snapshot.val());
 });
 batfirebase.on('value', snapshot => {this.setState({battery: snapshot.val()})
});
 HeartRatefirebase.on('value', snapshot => {this.setState({HeartRate: snapshot.val()})
});
 temperaturfirebase.on('value', snapshot => {this.setState({temperature: snapshot.val()})});
}


_updateStatus = status =>{
    //change emoji
    var img;
    var desc;
    if(status < 0.2){
      desc = "meltdown";
      img = require('./resources/sad.png');
    }else if(status < 0.4){
      desc = "angry";
      img = require('./resources/angry.png');
    }else if(status < 0.6){
      desc = "not bad";
      img = require('./resources/normal.png');
    }else if(status < 0.8){
      desc = "good";
      img = require('./resources/smile.png');
    }else{
      desc = "happy";
      img = require('./resources/happy.png');
    }
    this.setState({statusEmoji: img});
    this.setState({statusDesc: desc});
  }

  _getGradient(ratio){
    ratio = 1 - ratio;
    // var red =     '#ff0000';
    // var yellow =  '#ffff00';
    // var green =   '#008000';
    if (ratio == 0.5){
      return "#ffff00";
    }

    else if(ratio < 0.5){
      let r = ratio/0.5;
      let r2 = 1-r;

      let red = Math.round(255*r).toString(16); // #ff
      let green = Math.round(255*r + 128*r2).toString(16); // #ff*r + #80*r2
      // blue is 00
      if (red.length == 1) red = '0'+red;
      if (green.length == 1) green = '0' + green;

      return '#'+red+green+"00";
    }
    else {
      let r2 = 1-((ratio-.5)/.5);

      let green = Math.round(255*r2).toString(16);
      if (green.length == 1) green = '0' + green;
      return '#ff'+green+"00";
    }
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.meltdownButton}>
    <Text style={{color: '#fff'}}>{text}</Text>
    </View>
    </TouchableOpacity>
    );

    _renderSubmitButton() {
      this.setState({ meltdownTime: new Date().toLocaleString(), visibleModal: null });
      meltdownfirebase.push({time: this.state.meltdownTime, value: this.state.meltdownVal});
    }

    _renderModalContent = () => (
    <View style={styles.modalContent}>
    <Text style={{fontWeight: 'bold', marginBottom:20, color: '#fff'}}>Record meltdown</Text>
    <Text>Current time: {this.state.meltdownTime}</Text>
    <Slider style={{width:300}}
    minimumValue={0}
    maximumValue={5}
    step={1}
    value={this.state.meltdownVal}
    onValueChange={(newValue) => this.setState({ meltdownVal: newValue})}
    />
    <Text style={{marginBottom:20}}>Severity: {this.state.meltdownVal}</Text>
    {this._renderButton('Submit', () => this._renderSubmitButton())}
    {this._renderButton('Cancel', () => this.setState({ visibleModal: null }))}
    </View>
    )

    getDirections = () => {
      openMap({
        latitude: this.state.childLat,
        longitude: this.state.childLng,
      });
    }


    render() {
     const data = [
     {id: 1, name: 'Message', icon: 'comments'},
     {id: 2, name: 'History', icon: 'bar-chart'},
     {id: 3, name: 'Share', icon:'share'},
     {id: 4, name: 'Heart Rate' + '\n' + this.state.HeartRate + ' bpm', icon:'heart'},
     {id: 5, name: 'Send a Hug', icon: 'smile-o'},
     {id: 6, name: 'Body Temp' + '\n' + this.state.temperature + ' F', icon: 'thermometer-0'},
     ];

     return (
     <View style={{flex:1}}>
     <View>
     <Header
     placement="left"
     backgroundColor = "#ff1900"
     leftComponent={< ShirtStatus />}
     centerComponent={{ text: 'PAL', style: {color: '#fff', marginLeft: -30} }}
     rightComponent={{icon: 'menu',
     color: '#fff',
     onPress: () => Alert.alert(
     'PAL',
     'Settings',
     [
     {text: 'Change Child Name', onPress: () => AlertIOS.prompt(
     'Child Name',
     this.state.kidname,
     text => curfirebase.database().ref('/Users/' + uid+ "/name").set(text
     )
     )},
     {text: 'Return to App', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
     {text: 'Log Out', onPress: () => {
      firebase.auth().signOut().then(() => {
        this.props.navigator.push(Router.getRoute('goodbye'));
      }).catch(function(error) {
        // An error happened.
      });
    }},
    ],
    { cancelable: true }
    )}} 
    />
    <View>
    <Text style={styles.statusTitle}>{"Current Status"}</Text>
    <Text style={styles.statusGreen}>{this.state.statusDesc}</Text>
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
    source={this.state.statusEmoji}
    />
    </View>
    <View style={{ justifyContent: 'center', top: 175, height: 75, backgroundColor: '#fff', borderColor: '#d3d3d3', borderWidth: 1}}>
    <Text onPress={this.getDirections} style = {{textAlign: 'center'}}> 
    {this.state.kidname} is at 
    <Text style={{fontWeight: "bold"}}> {this.state.address} </Text>
    </Text>
    <Text>

    </Text>                
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
    <Icon style={styles.searchIcon} name={item.icon} size={20} color="#5DBCD2" />
    <Text style={styles.item}>{item.name}</Text>
    </View>
    </TouchableHighlight>
    )}
    keyExtractor={item => item.id}
    numColumns={numColumns}
    />
    <View style={styles.meltdownContainer}>
    {this._renderButton('Record Meltdown', () => this.setState({
      visibleModal: 1,
      meltdownTime: new Date().toLocaleString()
    }))}
    <Modal isVisible={this.state.visibleModal === 1}>
    {this._renderModalContent()}
    </Modal>
    </View>
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
)

const numColumns = 3;
