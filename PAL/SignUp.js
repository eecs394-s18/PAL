import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, ImageBackground } from 'react-native'
import * as firebase from 'firebase';
// import * as styles from './styles/login_styles.js'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
handleSignUp = () => {
  // TODO: Firebase stuff...
  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}
render() {
    return (
      <ImageBackground source={require('./resources/login_recolor.png')} style={styles.background}>
        <Text style = {styles.whiteText}> Welcome to PAL! </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
          title="Sign up"
          onPress={this.handleSignUp}
          color = 'white'
        />
        <Button 
          title = 'Already have an account? Login'
          onPress={() => this.props.navigation.navigate('Login')}
          color = 'white'
        />
        <Image 
          source = {require('./resources/GIABlue.png')} 
          style = {{marginTop: 100, width: 190, height: 170, opacity: .5}}
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