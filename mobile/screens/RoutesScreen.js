import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Container from '../components/Container';
import {
  ActionButton,
  Avatar,
  Toolbar,
  BottomNavigation,
  Subheader,
  COLOR,
} from 'react-native-material-ui';
import { loadRoutes } from '../reducers/route';

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    marginTop: 0,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardDesc: {
    textAlign: 'left',
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: COLOR.green300
  },
});

class RoutesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'observing'
    };
  }

  componentDidMount() {
    this.props.loadRoutes();
  }

  static navigationOptions = {
    title: 'Routes',
  };

  renderRoute(route, i) {
    const color = route.status === 'Observable' ? null :
      (route.status === 'Short List' ? COLOR.green400 : COLOR.orange400);
    return (
      <TouchableOpacity onPress={() => this.props.navigation.push('RouteDetails', { route })} key={'route'+i}>
        <View style={[styles.card, color && { backgroundColor: color }]}>
          <View style={{ marginRight: 10 }}>
            <Avatar text={route.title[0]} style={!color ? {} : {container: { backgroundColor: COLOR.white }, content: { color: COLOR.black }}} />
          </View>
          <View>
            <Text style={[styles.cardTitle, color && { color: COLOR.white }]}>{route.title}</Text>
            <Text style={[styles.cardADesc, color && { color: COLOR.white }]}>Status: {route.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const routes = this.props.routes
      .filter(el => (
        (this.state.active === 'observing' && (el.status === 'Observable' || el.status === 'Price Testing'))
        || (this.state.active === 'shortlist' && el.status === 'Short List')
        || (this.state.active === 'myroutes' && el.username === this.props.user.username)
      ));
    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.openDrawer()}
          centerElement="Routes"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {this.state.active === 'observing' && <Subheader text="Observing Routes" />}
          {this.state.active === 'shortlist' && <Subheader text="Short List" />}
          {this.state.active === 'myroutes' && <Subheader text="My Routes" />}
          {routes.map((route, i) => this.renderRoute(route, i))}
        </ScrollView>
        <ActionButton
          style={{ positionContainer: { bottom: 76 }, container: { shadowRadius: 5, backgroundColor: COLOR.green400 }}}
          onPress={() => this.props.navigation.navigate('RouteCreate')} />
        <BottomNavigation active={this.state.active} hidden={false} >
            <BottomNavigation.Action
                key="observing"
                icon="loyalty"
                label="Observing"
                onPress={() => this.setState({ active: 'observing' })}
            />
            <BottomNavigation.Action
                key="shortlist"
                icon="bookmark"
                label="Short List"
                onPress={() => this.setState({ active: 'shortlist' })}
            />
            <BottomNavigation.Action
                key="myroutes"
                icon="person"
                label="My Routes"
                onPress={() => this.setState({ active: 'myroutes' })}
            />
        </BottomNavigation>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.wallet.user,
    routes: state.route.routes,
  }),
  { loadRoutes }
)(RoutesScreen);