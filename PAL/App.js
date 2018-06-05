import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './main'



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


