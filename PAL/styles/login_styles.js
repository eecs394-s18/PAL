import {StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

const numColumns = 3;
const size = Dimensions.get('window').width/numColumns;
export default StyleSheet.create({
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
});
