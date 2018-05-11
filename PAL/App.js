import React, { Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Header } from 'react-native-elements';
import AnimatedBar from "react-native-animated-bar";

export default class App extends React.Component {
  state = {
    progress: 0.5,
    
  }
  render() {
    return (
      <View>
      <View>
        <Header
          placement="left"
          backgroundColor = "#ff1900"
          leftComponent={{ icon: 'watch', color: '#fff' }}
          centerComponent={{ text: 'PAL', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
          />

        <View>
            <AnimatedBar
              progress={this.state.progress}
              height={null}
              borderColor="#DDD"
              barColor="#f18400"
              borderRadius={5}
              borderWidth={5}
              duration={500}
            >
              <View style={[styles.row, styles.center]}>
                <Text style={[styles.barText, { fontSize: 30 }]}>
                  {Math.round(this.state.progress * 100)}%
                </Text>
              </View>
            </AnimatedBar>
        </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  barText: {
    backgroundColor: "transparent",
    color: "#FFF",
  }
});

