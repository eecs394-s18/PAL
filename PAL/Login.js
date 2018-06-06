// Login.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, alert, ImageBackground} from 'react-native';
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
        <ImageBackground source={require('./resources/login_background.jpeg')} style={styles.background}>
          <Text>Login</Text>
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
          <Button title="Login" onPress={this.handleLogin} />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
          <Button
            title="Forgot your Password?"
            onPress={() => firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
              alert("Check your Email!") 
            }).catch(function(error) {})}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    opacity: .9,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})