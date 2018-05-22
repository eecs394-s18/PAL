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

import styles from './styles/home';


export default class ReportsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
          color: "#fff",
          opacity: 0.5,
    }
    //Binds functions, defines them
    this.changeHR = this.changeHR.bind(this)
    this.changeXY = this.changeXY.bind(this)
    this.changeEMG = this.changeEMG.bind(this)
    //resp is in breaths per minute from last breath 
    this.changeresp = this.changeresp.bind(this)
    this.changehgsr = this.changehgsr.bind(this)


  }

  render() {
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
              style={{height:85, paddingTop: 5, paddingBottom: 5}}
              calendarHeaderStyle={{color: 'white'}}
              calendarColor={'#7743CE'}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              iconContainer={{flex: 0.1}}
          />
          //Passes data to graph
          <Chart ref = {Chart => {this._chart = Chart}} data = {data.XYcannedData}/>

          //Buttons to change Graph Data
          <Button onPress={this.changeXY}
            activeOpacity={this.state.opacity}
            underlayColor={this.state.color}
            title = "XY">
          </Button>

          <Button onPress={this.changeHR}
            activeOpacity={this.state.opacity}
            underlayColor={this.state.color}
            title = "HR">
          </Button>
            <Button onPress={this.changeEMG}
            activeOpacity={this.state.opacity}
            underlayColor={this.state.color}
            title = "EMG">
          </Button>
           <Button onPress={this.changeresp}
            activeOpacity={this.state.opacity}
            underlayColor={this.state.color}
            title = "Resp">
          </Button>
          <Button onPress={this.changehgsr}
            activeOpacity={this.state.opacity}
            underlayColor={this.state.color}
            title = "HGSR">
          </Button>
        </View>
    );
  }

  changeHR() {
    this._chart.changeHR(data.HRcannedData);
  }
  changeXY() {
    this._chart.changeXY(data.XYcannedData);
  }
  changeEMG() {
    this._chart.changeEMG(data.cannedEMGdata);
  }
  changeresp() {
    this._chart.changeresp(data.respcanneddata);
  }
   changehgsr() {
    this._chart.changehgsr(data.HGSRdata);
  }

}

// import data from JSON file
var data = require("./data/exampledata.json")

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


//Chart Component
Chart_data = data.XYcannedData
data_color = "#2082d8"
chart_title = "XY"


class Chart extends React.Component{
  constructor(props){
    super(props)
  }

  changeHR (new_data) {
    Chart_data = new_data
    data_color = "#f74259"
    chart_title = "Heart Rate"
    this.forceUpdate();
  }
  changeXY (new_data) {
    Chart_data = new_data
    data_color = "#2082d8"
    chart_title = "XY"
    this.forceUpdate();
  }
    changeEMG (new_data) {
    Chart_data = new_data
    data_color = "#8cd01b"
    chart_title = "EMG"
    this.forceUpdate();
  }
   changeresp (new_data) {
    Chart_data = new_data
    data_color = "#33d1d8"
    chart_title = "Respiratory"
    this.forceUpdate();
  }
   changehgsr (new_data) {
    Chart_data = new_data
    data_color = "#f59623"
    chart_title = "HGSR"
    this.forceUpdate();
  }
  render() {

    return (
      <View style={{ alignItems: 'center', }}>
        <Text style={{marginTop: 10, marginBottom: -30, fontSize: 20, fontWeight: 'bold'}}>{chart_title}</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
          style={{
            data: { stroke: data_color },
            parent: { border: "1px solid #ccc"}
          }}

          data = {Chart_data}
            />

        </VictoryChart>
      </View>
    );
  }
};
