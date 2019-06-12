import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import { connect } from 'react-redux';
import {
  Avatar,
  Toolbar,
  Subheader,
  COLOR,
} from 'react-native-material-ui';
import { loadBookings } from '../reducers/booking';

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

class BookingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadBookings();
  }

  static navigationOptions = {
    title: 'Bookings',
  };

  render() {
    const activeBookings = this.props.bookings
      .filter(el => el.status !== 'Finished');

    const finishedBookings = this.props.bookings
    .filter(el => el.status === 'Finished');
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

export default connect(
  (state) => ({
    user: state.wallet.user,
    bookings: state.booking.bookings,
  }),
  { loadBookings }
)(BookingsScreen);