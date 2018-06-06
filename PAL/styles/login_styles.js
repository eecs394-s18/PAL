import {StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

const numColumns = 3;
const size = Dimensions.get('window').width/numColumns;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  },
  background: {
    flex: 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  white_text: {
    color: 'white',
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