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

export default class BookingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Bookings',
  };

  render() {
    const activeBookings = [
      {
        title: 'Executing Title',
        status: 'Executing',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Executing Title 2',
        status: 'Executing',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'In auction Title',
        status: 'In auction',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
    ];

    const finishedBookings = [
      {
        title: 'Title 1',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Title 2',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
      {
        title: 'Title 3',
        status: 'Finished',
        route: {
          title: 'Route Details Title',
          description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bo.',
          status: 'Observable',
          routeElements: [
            {
              title: 'Route Element Title',
            },
            {
              title: 'Route Element Title 1',
            },
            {
              title: 'Route Element Title 2',
            },
          ]
        }
      },
    ]
    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.openDrawer()}
          centerElement="Bookings"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          <Subheader text="Active Bookings" />
          {activeBookings.map((booking, i) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetails', { booking })} key={'booking'+i}>
              <View style={[styles.card, { backgroundColor: booking.status === 'Executing' ? COLOR.green400 : COLOR.orange400 }]}>
                <View style={{ marginRight: 10 }}>
                  <Avatar text={booking.title[0]} style={{container: { backgroundColor: COLOR.white }, content: { color: COLOR.black }}} />
                </View>
                <View>
                  <Text style={[styles.cardTitle, { color: COLOR.white }]}>{booking.title}</Text>
                  <Text style={[styles.cardADesc, { color: COLOR.white }]}>Status: {booking.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Subheader text="Finished bookings" />
          {finishedBookings.map((booking, i) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetails', { booking })} key={'booking-finished'+i}>
              <View style={styles.card}>
                <View style={{ marginRight: 10 }}>
                  <Avatar text={booking.title[0]} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>{booking.title}</Text>
                  <Text style={styles.cardDesc}>Status: {booking.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Container>
    );
  }
}
