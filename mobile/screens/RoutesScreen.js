import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import {
  ActionButton,
  Avatar,
  ListItem,
  Toolbar,
  BottomNavigation,
  Icon,
  Subheader,
  Card,
  COLOR,
} from 'react-native-material-ui';

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

export default class RoutesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'observing'
    };
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
    const routes = [
      {
        title: 'Route Details Title',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Observable Title 2',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Observable Title 3',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Observable',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Price Testing 1',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Price Testing',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Price Testing 2',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Price Testing',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
      {
        title: 'Title 3',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
        status: 'Short List',
        routeElements: [
          {
            title: 'Route Element Title',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 1',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
          {
            title: 'Route Element Title 2',
            description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          },
        ]
      },
    ];
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
