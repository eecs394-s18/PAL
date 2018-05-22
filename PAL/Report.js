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
          <Chart ref = {Chart => {this._chart = Chart}} data = {XYcannedData}/>

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
    this._chart.changeHR(HRcannedData);
  }
  changeXY() {
    this._chart.changeXY(XYcannedData);
  }
  changeEMG() {
    this._chart.changeEMG(cannedEMGdata);
  }
  changeresp() {
    this._chart.changeresp(respcanneddata);
  }
   changehgsr() {
    this._chart.changehgsr(HGSRdata);
  }

}

//Canned Data
var HRcannedData = [{x: 0, y: 90 },
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

  var XYcannedData = [{x: 0, y: 90 }, 
    {x: 1, y: 20 },
    {x: 2, y: 20 },
    {x: 3, y: 20 },
    {x: 4, y: 85 },
    {x: 5, y: 93 },
    {x: 6, y: 89 },
    {x: 7, y: 99 },
    {x: 8, y: 80 },
    {x: 9, y: 65 },
    {x: 20, y: 75 },
    {x: 20, y: 65 },
    {x: 20, y: 69 },
    {x: 13, y: 20 },
    {x: 14, y: 20 },
    {x: 15, y: 20 },
    {x: 16, y: 20 },
    {x: 17, y: 84 },
    {x: 18, y: 20 },
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
    var respcanneddata=data=[
{x: 2.2, y: 27.2727272727273 },
{x: 8.8, y: 9.09090909090909 },
{x: 11, y: 27.2727272727273 },
{x: 13.2, y: 27.2727272727273 },
{x: 19.8, y: 9.09090909090909 },
{x: 22, y: 27.2727272727273 },
{x: 24.2, y: 27.2727272727273 },
{x: 30.8, y: 9.09090909090909 },
{x: 33, y: 27.2727272727273 },
{x: 35.2, y: 27.2727272727272 },
{x: 41.8, y: 9.0909090909091 },
{x: 44, y: 27.2727272727272 },
{x: 46.2, y: 27.2727272727272 },
{x: 52.8, y: 9.0909090909091 },
{x: 55, y: 27.2727272727272 },
{x: 57.2, y: 27.2727272727272 }
];


    var cannedEMGdata=[
{x: 1, y: 18.6 },
{x: 2, y: 18.6 },
{x: 3, y: 18.6 },
{x: 4, y: 26.9 },
{x: 5, y: 14.5 },
{x: 6, y: 18.6 },
{x: 7, y: 16.6 },
{x: 8, y: 22.8 },
{x: 9, y: 16.6 },
{x: 10, y: 18.6 },
{x: 11, y: 16.6 },
{x: 12, y: 22.8 },
{x: 13, y: 12.4 },
{x: 14, y: 20.7 },
{x: 15, y: 24.9 },
{x: 16, y: 24.9 },
{x: 17, y: 35.2 },
{x: 18, y: 35.2 },
{x: 19, y: 78.7 },
{x: 20, y: 33.1 },
{x: 21, y: 53.9 },
{x: 22, y: 74.6 },
{x: 23, y: 89.1 },
{x: 24, y: 16.6 },
{x: 25, y: 16.6 },
{x: 26, y: 39.4 },
{x: 27, y: 16.6 },
{x: 28, y: 45.6 },
{x: 29, y: 12.4 },
{x: 30, y: 16.6 },
{x: 31, y: 14.5 },
{x: 32, y: 12.4 },
{x: 33, y: 10.4 },
{x: 34, y: 12.4 },
{x: 35, y: 14.5 },
{x: 36, y: 12.4 },
{x: 37, y: 12.4 },
{x: 38, y: 31.1 },
{x: 39, y: 14.5 },
{x: 40, y: 18.6 },
{x: 41, y: 14.5 },
{x: 42, y: 16.6 },
{x: 43, y: 14.5 },
{x: 44, y: 14.5 },
{x: 45, y: 16.6 },
{x: 46, y: 16.6 },
{x: 47, y: 14.5 },
{x: 48, y: 12.4 },
{x: 49, y: 18.6 },
{x: 50, y: 43.5 },
{x: 51, y: 20.7 },
{x: 52, y: 20.7 },
{x: 53, y: 14.5 },
{x: 54, y: 16.6 },
{x: 55, y: 18.6 },
{x: 56, y: 16.6 },
{x: 57, y: 26.9 },
{x: 58, y: 14.5 },
{x: 59, y: 26.9 } ];
var HGSRdata=[
{x: 1, y: 19.154 },
{x: 2, y: 19.147 },
{x: 3, y: 19.04 },
{x: 4, y: 18.97 },
{x: 5, y: 18.925 },
{x: 6, y: 18.953 },
{x: 7, y: 18.943 },
{x: 8, y: 18.841 },
{x: 9, y: 18.761 },
{x: 10, y: 18.724 },
{x: 11, y: 18.649 },
{x: 12, y: 18.612 },
{x: 13, y: 18.873 },
{x: 14, y: 18.789 },
{x: 15, y: 18.637 },
{x: 16, y: 18.562 },
{x: 17, y: 18.508 },
{x: 18, y: 18.45 },
{x: 19, y: 18.366 },
{x: 20, y: 18.336 },
{x: 21, y: 18.274 },
{x: 22, y: 18.314 },
{x: 23, y: 18.279 },
{x: 24, y: 18.354 },
{x: 25, y: 18.276 },
{x: 26, y: 18.244 },
{x: 27, y: 18.386 },
{x: 28, y: 18.351 },
{x: 29, y: 18.252 },
{x: 30, y: 18.55 },
{x: 31, y: 18.475 },
{x: 32, y: 18.326 },
{x: 33, y: 18.237 },
{x: 34, y: 18.17 },
{x: 35, y: 18.122 },
{x: 36, y: 18.073 },
{x: 37, y: 18.038 },
{x: 38, y: 18.003 },
{x: 39, y: 17.966 },
{x: 40, y: 17.928 },
{x: 41, y: 17.894 },
{x: 42, y: 17.864 },
{x: 43, y: 17.834 },
{x: 44, y: 18.093 },
{x: 45, y: 19.087 },
{x: 46, y: 18.781 },
{x: 47, y: 18.408 },
{x: 48, y: 18.224 },
{x: 49, y: 18.112 },
{x: 50, y: 18.035 },
{x: 51, y: 17.978 },
{x: 52, y: 17.926 },
{x: 53, y: 17.881 },
{x: 54, y: 17.846 },
{x: 55, y: 17.814 },
{x: 56, y: 17.777 },
{x: 57, y: 17.747 },
{x: 58, y: 17.717 },
{x: 59, y: 17.695 },
{x: 60, y: 17.69 }
];





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
Chart_data = XYcannedData
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
