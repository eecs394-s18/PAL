import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {
    render() {
        return (
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Icon style={styles.searchIcon} name={item.icon} size={20} color="#000" />
                        <Text style={styles.item}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                numColumns={numColumns} />
        );
    }
}

const data = [
    {id: 1, name: 'Message', icon: 'comments'},
    {id: 2, name: 'So Far Today', icon: 'bar-chart'},
    {id: 3, name: 'Share', icon:'share'},
    {id: 4, name: 'Heart Rate', icon:'heart'},
    {id: 5, name: 'Send a Hug or Calming Technique'},
    {id: 6, name: 'Body Temperature', icon: 'thermometer-0'},
];
const numColumns = 3;
const size = Dimensions.get('window').width/numColumns;
const styles = StyleSheet.create({
    itemContainer: {
        width: size,
        height: size,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        top: 400,
    },
    item: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        marginRight: 10,
        marginLeft: 10,
    },
    searchIcon: {
        padding: 10,
    },
});