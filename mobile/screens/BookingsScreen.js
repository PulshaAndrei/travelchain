import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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
      .filter(el => el.status !== 'FINISHED');

    const finishedBookings = this.props.bookings
      .filter(el => el.status === 'FINISHED');
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
          {this.props.loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}
          {!this.props.loading && 
            <View>
              <Subheader text="Active Bookings" />
              {activeBookings.map((booking, i) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetails', { booking })} key={'booking'+i}>
                  <View style={[styles.card, { backgroundColor: booking.status === 'EXECUTING' ? COLOR.green400 : COLOR.orange400 }]}>
                    <View style={{ marginRight: 10 }}>
                      {!booking.route.imageUrl && <Avatar text={booking.route.title[0]} style={{container: { backgroundColor: COLOR.white }, content: { color: COLOR.black }}} />}
                      {booking.route.imageUrl && <Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: booking.route.imageUrl}} />} />}
                    </View>
                    <View>
                      <Text style={[styles.cardTitle, { color: COLOR.white }]}>{booking.route.title}</Text>
                      <Text style={[styles.cardADesc, { color: COLOR.white }]}>
                        Status: {booking.status === 'EXECUTING' ? 'Executing' : 'In Auction'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              <Subheader text="Finished bookings" />
              {finishedBookings.map((booking, i) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetails', { booking })} key={'booking-finished'+i}>
                  <View style={styles.card}>
                    <View style={{ marginRight: 10 }}>
                      {!booking.route.imageUrl && <Avatar text={booking.route.title[0]} />}
                      {booking.route.imageUrl && <Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: booking.route.imageUrl}} />} />}
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>{booking.route.title}</Text>
                      <Text style={styles.cardDesc}>
                        Status: Finished
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>}
        </ScrollView>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.wallet.user,
    bookings: state.booking.bookings,
    loading: state.booking.loading,
  }),
  { loadBookings }
)(BookingsScreen);