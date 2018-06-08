# PAL

PAL is a pair of React Native applications for parents with children with Autism Spectrum Disorder. 
This project was built in conjunction with Gaia LCC as Team Orange's Client Project for EECS 394.

## Contributors
* Bruce Chen
* Nick David - [Github](https://github.com/NickDavidNU), nicholasdavid2019@u.northwestern.edu
* Dayeon Hwang - [Github](https://github.com/dayeonhwang), dahwang2018@u.northwestern.edu
* Ben Kalish
* Ben Krege - [Github](https://github.com/JBKrege), johnkrege2018@u.northwestern.edu
* Yuze Li
* Kevin Mui - [Github](https://github.com/kekamui), kevinmui2020@u.northwestern.edu


## Pal Child App
The child app includes the most important information for children with ASD to have during their day, including their schedule, a map, and Pal's status. The mobile app will recieve data from wearable technology that detects a variety of biometric data from the child. Then, the app will send the data to a Firebase.

## Pal Parent App 
The parent app provides the parent with all the tools to be aware of his or her child's wellbeing during her day. The dashboard is the primary landing pad, and the child's status, and biometric data can seen at a glance. Here, the parent can also report a meltdown. If the parent is interested in how a child's day really went, he or she navigate to the reports page, where all the biometric data is displayed is line graphs.

Below you'll find information about installing, running app, troubleshooting and implementation details.
## Table of Contents
* [Installing](#installing)
* [Running](#running)
* [Implementation Details](#implementation)
* [Next Steps](#nextsteps)
* [Contributors](#contributors)

## Installing

Download our app's code by cloning our git repository on your laptop's terminal.
```
git clone https://github.com/eecs394-s18/PAL.git
```

After going to PAL folder that is created after cloning, go to PAL folder or PAL_child folder.
* `../PAL/PAL`: parent app
* `../PAL/PAL_child`: child app

Once you're at the right path, you will see `package.json` that tells you what to install to run it.
Running `npm i --save` (within both the Pal and Pal_Child sub directory) will help you install all libraries and dependencies and `save` keyword will prevent you from repeating installation of same libraries. After this, you will see a new `package-lock.json` file.

# Running

### `npm start`

Runs your app in development mode.

If you have Xcode or Android Build Tools you can simply press i or a to run the simulator.

To run on your phone, first download the [Expo app](https://expo.io). It will reload dynamically as you save edits to your files, and you can see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

# Implementation Details

### Firebase
The backend of this app (such as user accounts and the database) runs on Firebase.

  In order to implement this and continue development, you will have to set up your own Firebase account. This is a quick process and can be done here https://console.firebase.google.com/u/1/. Once set-up go to Authentication--> Sign-In Method and ENABLE "Email/Password." Feel free to add our previous database contents from (https://github.com/eecs394-s18/PAL/blob/master/DataBase_Backup.json).

  Finally, enter your credentials into FbApp.js in the PAL directory.

### Home page

#### State
Below is a list of fields of HomeScreen class's state that we used and updated throughout our app.
```
class HomeScreen extends React.Component {
  constructor(props){
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
``` 

#### Login

Implemented with Firebase

#### Semi-Circle Status Bar
The status bar is actually a AnimatedCircularProgress component. Its three color gradient is created with proprietary code in GetGradient, but Expo's LinearGradient may also work.

#### Meltdown
We made a modal to pop up after clicking 'Record Meltdown' button, and we used React Native's Slider component to render a slider and choose a severity of meltdown ranging from 0 to 5.

### Report Page
We used Victory Chart Component of [Victory Native Module](https://github.com/FormidableLabs/victory-native). This was to display data in a graph form on the `../PAL/Report.js` page.
```
<View style={{ alignItems: 'center', }}>
  <Text style={{marginTop: 10, marginBottom: -30, fontSize: 20, fontWeight: 'bold'}}>{chart_title}</Text>
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryLine
    style={{
      data: { stroke: data_color },
      parent: { border: "1px solid #ccc"}
    }}
    data = {this.state.Chart_data}
     x = {this.state.x}
     y = {this.state.y}
      />

  </VictoryChart>
</View>
```

#### Biometrics Graphs
The graph data is stored in `../data/exampledata.json` but it would be easy to pass in dynamically loaded data from Firebase. Functions in `../PAL/Report.js` were created to switch graph display data. 

The graph data is stored in `../data/exampledata.json` but it is possible to pass in dynamically loaded data. Functions in `../PAL/Report.js` were created to switch graph display data.
>>>>>>> 
Data requirements: An array with dictionary key values of 'x' and 'y'.
```
"{ HRcannedData": [
  {"x": 0, "y": 90 },
  {"x": 1, "y": 90 },
  {"x": 2, "y": 88 },
  {"x": 3, "y": 86 },
  {"x": 4, "y": 85 },
  {"x": 5, "y": 93 },
  ]
 }
"
```

### Schedule Page
We used Agenda Component of [React Native Calendars Module](https://github.com/wix/react-native-calendars).
We put down temporary random data for each date's schedule, but those can be easily replaced.
```
<Agenda
  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={
    {'2018-06-10': [{text: 'item 1'}],
     '2018-06-11': [{text: 'item 2'}],
     '2018-06-12': [],
    }}
  ...
/>
```

## Next Steps
Below are several new features we could not implement because of time constraints of the class:
* Social features - Message and share with community including family, doctors, friends, etc  
* Push notifications for meltdowns
* Integrate with Google Calendar
* Integrate with hardware
* Send hardware data from child app to Firebase.
* Deploy to app stores
