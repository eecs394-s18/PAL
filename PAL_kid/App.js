import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, StatusBar, FlatList, Alert, Image} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CalendarStrip from 'react-native-calendar-strip';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import * as firebase from 'firebase';

import styles from './styles/home';
import MyCircleScreen from './MyCircle';
import ReportsScreen from './Report';

import { Constants, Location, Permissions, MapView } from 'expo';




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
var statusfirebase=curfirebase.database().ref("/Jason/status");
var coorfirebase=curfirebase.database().ref("/Jason/coordinates/");
var batfirebase=curfirebase.database().ref("/Jason/battery");


class HomeScreen extends React.Component {
    constructor(props){
	super(props);
	
	this.state = {
	    progress: 0.5,
	    opacity: 0.5,
	    battery: 0.0,
	    lat: "",
	    lng: "",
	    locationName: "",
	    
	    mapRegion: { 
	    	latitude: 37.78825, 
	    	longitude: -122.4324, 
	    	latitudeDelta: 0.0922, 
			longitudeDelta: 0.0421
	    	},
	    locationResult: null
	};
}
	
	componentDidMount() {
		Geocoder.init('AIzaSyDYBD9kcnAd-Zcf-hn5d_Aq9Y2vLgqDfsw');
		this._getLocationAsync();
		this._getInfoFromDatabase();
	    
	}

	_updateLoactionName = location => {
 		let lat = location.coords.latitude;
	   	let lon = location.coords.longitude;
	   	let address = "";
	   	Geocoder.from(lat, lon)
        .then(json => {
        	address_components = json.results[0]["address_components"];
        	address = address_components[0].long_name+" "+
        			address_components[1].long_name+", "+
        			address_components[2].long_name;
        	this.setState({locationName: address});
        })
        .catch(error => console.warn(error));
        
 	};

 	_uploadLocationToDatabase = location => {
 		let lat = location.coords.latitude;
	   	let lon = location.coords.longitude;
	   	this.setState({ lat: lat});
	   	this.setState({ lng: lon});
	   	coorfirebase.set({
	   		lat: lat,
	   		lng: lon
	   	});
	};

	_updateMapRegion = location => {
		let lat = location.coords.latitude;
	   	let lon = location.coords.longitude;
		let mapRegionCopy = Object.assign({}, this.state.mapRegion); 
	   	mapRegionCopy.latitude = lat;
	   	mapRegionCopy.longitude = lon;
	   	this.setState({ mapRegion: mapRegionCopy});
	};

	_getLocationAsync = async () => {
	   let { status } = await Permissions.askAsync(Permissions.LOCATION);
	   if (status !== 'granted') {
	     this.setState({
	       locationResult: 'Permission to access location was denied',
	     });
	   }

	   let location = await Location.getCurrentPositionAsync({});

	   if(location!==null){
	   	// update the location
	   	this._uploadLocationToDatabase(location);
	   	// update the location name
	   	this._updateLoactionName(location);
	   	// update the map 
	   	this._updateMapRegion(location);
	   }

	   this.setState({ locationResult: JSON.stringify(location) });

 	};



 	_handleMapRegionChange = mapRegion => {
    	this.setState({ mapRegion });
  	};
	_getInfoFromDatabase(){

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
	            backgroundColor = "#ef8b3e"
	            leftComponent={< ShirtStatus />}
	            centerComponent={{ text: 'PAL', style: {color: '#fff', marginLeft: -30} }}
	            rightComponent={{ icon: 'menu', color: '#fff' }}
	            />
	          <View>
		            <Text style={styles.statusTitle}>{"Your Current Status"}</Text>
		            <Text style={styles.statusGreen}>Green</Text>
		            <AnimatedCircularProgress
		              style = {styles.semiCircleContainer}
		              size={Dimensions.get('window').width-100}
		              width={25}
		              fill={100*this.state.progress}
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

	               <View style={{ justifyContent: 'center', top: 175, height: 75, backgroundColor: '#e4e4e4'}}>
	                    <Text style = {{textAlign: 'center'}}> You are at {this.state.locationName}</Text>  
	  				</View>

	  				<View>
	  					<MapView
				          style={styles.map}
				          region={this.state.mapRegion}
				          onRegionChange={this._handleMapRegionChange}
				        />
	  				</View>  				

	          </View>
          </View>
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


export default createBottomTabNavigator(
  {
    Home: HomeScreen,
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
