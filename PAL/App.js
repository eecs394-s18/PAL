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


