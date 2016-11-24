import React from 'react';
import { Dimensions, Image, View,
         Text, StyleSheet } from 'react-native';
import { takeSnapshotAsync } from 'exponent';
import Colors from '../constants/Colors';
import SignatureView from '../components/SignatureView';
import Header from '../components/Header';
import ColorSelector from '../components/ColorSelector';

export default class SignatureScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      result: null,
      color: Colors.color16,
      strokeWidth: 4,
      donePaths: []
    };

    this._undo = this._undo.bind(this);
    this._setDonePaths = this._setDonePaths.bind(this);
  }

  _cancel = () => {
    this.setState({ donePaths: [] });
  }

  _undo = () => {
    this.setState({ donePaths: this.state.donePaths.slice(0,-1) });
  }

  _save = async () => {
    let result = await takeSnapshotAsync(
      this._signatureView,
      {format: 'png', result: 'base64', quality: 1.0}
    );
    this.setState({result});
  }

  _setDonePaths = donePaths => {
    this.setState({ donePaths });
  }

  _changeColor = color => {
    this.setState({ color: color });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          save={this._save}
          undo={this._undo}
          cancel={this._cancel}
        />

        <ColorSelector onPress={this._changeColor} />

        <View style={{ alignItems: 'center' }}>
          <SignatureView
            ref={view => { this._signatureView = view; }}
            donePaths={this.state.donePaths}
            setDonePaths={this._setDonePaths}
            containerStyle={{backgroundColor: '#FFF', marginTop: 10}}
            width={Dimensions.get('window').width - 20}
            height={Dimensions.get('window').width - 20}
            color={this.state.color}
            strokeWidth={this.state.strokeWidth}
          />
        </View>

        {this.state.result && (
          <Image
            source={{uri: `data:image/png;base64,${this.state.result}`}}
            style={{
              width: Dimensions.get('window').width / 3,
              height: Dimensions.get('window').width / 3,
              margin: 10
            }}
          />
        )}

        <Text style={styles.footer}>
          Powered by Rmotr. Made by @brentvatne.
        </Text>
      </View>
    );
  }
}

SignatureView.route = {
  navigationBar: {
    visible: false
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },

  footer: {
    color: '#555',
    fontSize: 12,
    position: 'absolute',
    bottom: 5,
    right: 10
  }
});
