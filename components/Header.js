import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';

class Header extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Text style={styles.title}>
            Rmotrpaint
          </Text>

          <IconButton
            onPress={this.props.cancel}
            name="remove"
          />
          <IconButton
            onPress={this.props.undo}
            name="undo"
          />
          <IconButton
            onPress={this.props.save}
            name="check"
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#EEE',
    paddingTop: 18,
    paddingBottom: 5
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 3
  },

  title: {
    color: '#444',
    fontSize: 20,
    fontWeight: '900',
    marginRight: 20
  }
});

export default Header;
