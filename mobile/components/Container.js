import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Container extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.blue500, height: 25 }} />
        <View style={styles.container}>{this.props.children}</View>
      </View>
    );
  }
}
