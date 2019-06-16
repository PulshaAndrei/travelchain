import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import { finishBookingAuction, finishContracts } from '../reducers/booking';
import { connect } from 'react-redux';
import {
  Button,
  Avatar,
  ListItem,
  Toolbar,
  Subheader,
  COLOR,
} from 'react-native-material-ui';

const styles = StyleSheet.create({
  imageView: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  image: {
    borderRadius: 16,
    flex: 1,
    width: '100%',
    height: 200,
  },
  title: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  description: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    textAlign: 'left',
  },
  button: {
    height: 50,
    backgroundColor: COLOR.green400
  },
});

class BookingDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: {}
    };
  }

  static navigationOptions = {
    title: 'BookingDetails',
  };

  onCloseDialog() {
    if (this.state.dialog.status === 'success') {
      this.setState({ dialog: {} });
      this.props.navigation.navigate('Bookings');
    } else if (this.state.dialog.status === 'error') {
      this.setState({ dialog: {} });
    }
  }

  async finishBookingAuction() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.finishBookingAuction(this.props.navigation.state.params.booking.bookingId);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  async finishContracts() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.finishContracts(this.props.navigation.state.params.booking);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  render() {
    const booking = this.props.navigation.state.params.booking;
    const { route } = this.props.navigation.state.params.booking;

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Booking Details"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{uri: route.imageUrl || 'http://greecechinabusiness.com/wp-content/uploads/2016/07/travel-tourism-city-landmarks-1050x600_c.jpg'}}
            />
          </View>
          <Text style={styles.title}>{route.title}</Text>
          <Subheader text="Description" />
          <Text style={styles.description}>{route.description}</Text>
          <Subheader text="Price" />
          <Text style={styles.description}>{booking.route.price} Travel Coins</Text>
          <Subheader text="Booked Coins" />
          <Text style={styles.description}>{booking.bookedCoins} TravelCoins</Text>
          {route.routeElements.map((routeElement, i) => (
            <ListItem
              key={'routeElement' + i}
              divider
              leftElement={routeElement.mediaUrl
                ? (<Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: routeElement.mediaUrl}} />} />)
                : (<Avatar text={routeElement.title[0]} />)}
              centerElement={{
                primaryText: routeElement.title,
                secondaryText: booking.status === 'AUCTION'
                  ? `Bets: ${routeElement.bets}`
                  : routeElement.description,
              }}
              rightElement={booking.status === 'AUCTION' ? 'work' : 'info'}
              onRightElementPress={() => this.props.navigation.navigate('RouteElementDetails', { routeElement })}
              onPress={() => this.props.navigation.navigate('RouteElementDetails', { routeElement })}
            />
          ))}
        </ScrollView>
        {booking.status === 'AUCTION' && <Button primary raised style={{container : styles.button}} text="Finish Auction" onPress={() => this.finishBookingAuction()} />}
        {booking.status === 'EXECUTING' && <Button primary raised style={{container : styles.button}} text="Finish Contracts" onPress={() => this.finishContracts() } />}
        <ProgressDialog visible={!!this.state.dialog.status} status={this.state.dialog.status} text={this.state.dialog.text} onClose={() => this.onCloseDialog()} />
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { finishBookingAuction, finishContracts }
)(BookingDetailsScreen);