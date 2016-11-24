import Exponent from 'exponent';
import React from 'react';
import { Platform, StatusBar, Text,
         View, StyleSheet } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import SignatureScreen from './screens/SignatureScreen';

const Router = createRouter(() => ({
  signature: () => SignatureScreen,
}));

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <StackNavigation
            initialRoute={Router.getRoute('signature')}
          />
        </NavigationProvider>

        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
});

Exponent.registerRootComponent(App);
