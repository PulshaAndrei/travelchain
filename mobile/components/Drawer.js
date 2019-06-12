import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Avatar, Drawer, COLOR } from 'react-native-material-ui';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    elevation: 4,
    backgroundColor: 'white',
  },
  drawerContainer: {
    flex: 1,
  },
  drawerContentContainer: {
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 50,
    backgroundColor: COLOR.blue400,
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const getActiveRouteState = function(route) {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

class DrawerComponent extends React.Component {
  get route() {
    return getActiveRouteState(this.props.navigation.state).key;
  }

  render() {
    const firstName = this.props.user.firstName;
    const lastName = this.props.user.lastName;
    const email = this.props.user.username;

    return (
      <View style={styles.container}>
        <Drawer style={{container: styles.drawerContainer, contentContainer: styles.drawerContentContainer }}>
          <Drawer.Header style={{contentContainer: styles.header }}>
            <Drawer.Header.Account
              avatar={<Avatar style={{container: { marginBottom: 10 }}} image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: 'http://mldd.nl/wp-content/uploads/2019/05/man_1074208.png'}} />} />}
              footer={{
                dense: true,
                centerElement: {
                  primaryText: `${firstName} ${lastName}`,
                  secondaryText: email,
                },
              }}
            />
          </Drawer.Header>
          <Drawer.Section
            divider
            items={[
              {
                icon: 'person',
                value: 'Wallet',
                active: this.route === 'Wallet',
                onPress: () => this.props.navigation.navigate('Wallet'),
              },
              {
                icon: 'class',
                value: 'My Bookings',
                active: this.route === 'Bookings',
                onPress: () => this.props.navigation.navigate('Bookings'),
              },
              {
                icon: 'map',
                value: 'Routes',
                active: this.route === 'Routes',
                onPress: () => this.props.navigation.navigate('Routes'),
              },
              {
                icon: 'inbox',
                value: 'Content',
                active: this.route === 'Content',
                onPress: () => this.props.navigation.navigate('Content'),
              },
            ]}
          />
          <Drawer.Section
            title="More"
            items={[
              { icon: 'info', value: 'Info' },
              { icon: 'settings', value: 'Settings' },
            ]}
          />
        </Drawer>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    user: state.wallet.user
  }),
  { }
)(DrawerComponent);