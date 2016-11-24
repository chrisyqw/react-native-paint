import React from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Reaction from './Reaction';

export default class SignatureView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentMax: 0,
      currentPoints: [],
      reaction: new Reaction()
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => true,
      onMoveShouldSetPanResponder: (evt, gs) => true,
      onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
      onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
      onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs)
    });
  }

  onTouch(evt) {
    let [x, y] = [evt.nativeEvent.pageX, evt.nativeEvent.pageY];
    const newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({ x, y });

    this.setState({
      donePaths: this.props.donePaths,
      currentPoints: newCurrentPoints,
      currentMax: this.state.currentMax
    });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
  }

  onResponderRelease() {
    const newPaths = this.props.donePaths;
    if (this.state.currentPoints.length > 0) {
      // Cache the shape object so that we aren't testing
      // whether or not it changed; too many components?
      newPaths.push(
        <Path
          key={this.state.currentMax}
          d={this.state.reaction.pointsToSvg(this.state.currentPoints)}
          stroke={this.props.color}
          strokeWidth={this.props.strokeWidth}
          fill="none"
        />
      );
    }

    this.state.reaction.addGesture(this.state.currentPoints);

    this.setState({
      currentPoints: [],
      currentMax: this.state.currentMax + 1
    });

    this.props.setDonePaths(newPaths);
  }

  _onLayoutContainer = (e) => {
    this.state.reaction.setOffset(e.nativeEvent.layout);
  }

  render() {
    return (
      <View
        onLayout={this._onLayoutContainer}
        style={[
          styles.drawContainer,
          this.props.containerStyle,
          { width: this.props.width, height: this.props.height }
        ]}
      >

        <View {...this._panResponder.panHandlers}>
          <Svg
            style={styles.drawSurface}
            width={this.props.width}
            height={this.props.height}
          >
            <G>
              {this.props.donePaths}
              <Path
                key={this.state.currentMax}
                d={this.state.reaction.pointsToSvg(this.state.currentPoints)}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth - 1}
                strokeOpacity={0.5}
                fill="none"
              />
            </G>
          </Svg>

          {this.props.children}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  drawContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },

  drawSurface: {
    backgroundColor: 'transparent'
  }
});
