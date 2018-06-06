// Login.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, alert, ImageBackground, Image} from 'react-native';
import * as firebase from 'firebase';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
        const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleLogin')

  }
  render() {
    return (
        <ImageBackground source={require('./resources/login_recolor.png')} style={styles.background}>
          <Text style = {styles.whiteText}>Welcome back!</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button 
            title="Login"
            onPress={this.handleLogin}
            color = 'white'
          />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
            color = 'white'
          />
          <Button
            title="Forgot your Password?"
            onPress={() => firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
              alert("Check your Email!") 
            }).catch(function(error) {})}
            color = 'white'
          />
          <Image 
            source = {require('./resources/GIABlue.png')} 
            style = {{marginTop: 65, width: 190, height: 170, opacity: .5}}
          />
        </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteText: {
    fontWeight: 'bold',
    marginTop: 200,
    color: 'white',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, .9)',
    textShadowRadius: 15,
    opacity: 1
  },
  loginButton: {
    color: 'red',
    borderColor: 'black',
    backgroundColor: 'black'
  },
  textInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    opacity: .9,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})