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

export default class ReportsScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
            style={{height:140, paddingTop: 40, paddingBottom: 5}}
            calendarHeaderStyle={{color: 'white'}}
            calendarColor={'#7743CE'}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
        />
    );
  }
}
