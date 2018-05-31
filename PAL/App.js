import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, StatusBar, FlatList, Alert, Image} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as firebase from 'firebase';
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './main'
import styles from './styles/home';
import ScheduleScreen from './Schedule';
import ReportsScreen from './Report';
import { GetGradient } from './gradient';
import Modal from 'react-native-modal';
import Slider from "react-native-slider";

//Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyDA_RXtRHQI4IlCK-M2r9wgyBMYBFgs4m4",
//     authDomain: "pal394-a6f1f.firebaseapp.com",
//     databaseURL: "https://pal394-a6f1f.firebaseio.com",
//     projectId: "pal394-a6f1f",
//     storageBucket: "",
//     messagingSenderId: "33475295035"
// };

// var curfirebase=firebase.initializeApp(firebaseConfig);
// var addressfirebase=curfirebase.database().ref("/Jason/address");
// var statusfirebase=curfirebase.database().ref("/Jason/status");
// var batfirebase=curfirebase.database().ref("/Jason/battery");


//on app open sends us to loading.js which determines our login state
const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App

