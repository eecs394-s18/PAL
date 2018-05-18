import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, StatusBar, FlatList, Alert, Image} from 'react-native';
import Dimensions from 'Dimensions';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory-native";
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
    let cannedData = [{x: 0, y: 90 },
      {x: 1, y: 90 },
      {x: 2, y: 88 },
      {x: 3, y: 86 },
      {x: 4, y: 85 },
      {x: 5, y: 93 },
      {x: 6, y: 89 },
      {x: 7, y: 99 },
      {x: 8, y: 80 },
      {x: 9, y: 65 },
      {x: 10, y: 75 },
      {x: 11, y: 65 },
      {x: 12, y: 69 },
      {x: 13, y: 74 },
      {x: 14, y: 76 },
      {x: 15, y: 78 },
      {x: 16, y: 85 },
      {x: 17, y: 84 },
      {x: 18, y: 80 },
      {x: 19, y: 88 },
      {x: 20, y: 77 },
      {x: 21, y: 76 },
      {x: 22, y: 80 },
      {x: 23, y: 80 },
      {x: 24, y: 80 },
      {x: 25, y: 91 },
      {x: 26, y: 89 },
      {x: 27, y: 86 },
      {x: 28, y: 89 },
      {x: 29, y: 84 },
      {x: 30, y: 83 },
      {x: 31, y: 90 },
      {x: 32, y: 85 },
      {x: 33, y: 85 },
      {x: 34, y: 87 },
      {x: 35, y: 81 },
      {x: 36, y: 77 },
      {x: 37, y: 80 },
      {x: 38, y: 80 },
      {x: 39, y: 80 },
      {x: 40, y: 85 },
      {x: 41, y: 89 },
      {x: 42, y: 85 },
      {x: 43, y: 84 },
      {x: 44, y: 90 },
      {x: 45, y: 91 },
      {x: 46, y: 84 },
      {x: 47, y: 80 },
      {x: 48, y: 63 },
      {x: 49, y: 59 },
      {x: 50, y: 63 },
      {x: 51, y: 65 },
      {x: 52, y: 67 },
      {x: 53, y: 74 },
      {x: 54, y: 84 },
      {x: 55, y: 80 },
      {x: 56, y: 82 },
      {x: 57, y: 85 },
      {x: 58, y: 85 },
      {x: 59, y: 84 },
      {x: 60, y: 81 }];

    return (
        <View>
            <Header
            placement="left"
            backgroundColor = "#ff1900"
            leftComponent={< ShirtStatus />}
            centerComponent={{ text: 'PAL', style: {color: '#fff', marginLeft: -30} }}
            rightComponent={{ icon: 'menu', color: '#fff' }}
            />

          <CalendarStrip
              calendarAnimation={{type: 'sequence', duration: 30}}
              daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
              style={{height:100, paddingTop: 5, paddingBottom: 5}}
              calendarHeaderStyle={{color: 'white'}}
              calendarColor={'#7743CE'}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              iconContainer={{flex: 0.1}}
          />

          <Chart data={cannedData} />
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

class Chart extends React.Component{

  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
        style={{
          data: { stroke: "#2082d8" },
          parent: { border: "1px solid #ccc"}
        }}
        data={this.props.data}
          />
      </VictoryChart>
    );
  }
};
