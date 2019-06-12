import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import {
  Button,
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

export default class BookingDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'observing'
    };
  }

  static navigationOptions = {
    title: 'BookingDetails',
  };

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
          <Text style={styles.description}>{booking.price} Travel Coins</Text>
          <Subheader text="Booked Coins" />
          <Text style={styles.description}>{booking.bookedCoins} TravelCoins</Text>
          {route.routeElements.map((routeElement, i) => (
            <ListItem
              key={'routeElement' + i}
              divider
              leftElement={routeElement.imageUrl
                ? (<Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: routeElement.imageUrl}} />} />)
                : (<Avatar text={routeElement.title[0]} />)}
              centerElement={{
                primaryText: routeElement.title,
                secondaryText: routeElement.description,
              }}
              rightElement="info"
              onRightElementPress={() => this.props.navigation.navigate('RouteElementDetails', { routeElement })}
              onPress={() => this.props.navigation.navigate('RouteElementDetails', { routeElement })}
            />
          ))}
        </ScrollView>
        {booking.status === 'In auction' && <Button primary raised style={{container : styles.button}} text="Finish Auction" />}
        {booking.status === 'Executing' && <Button primary raised style={{container : styles.button}} text="See the Contracts" />}
      </Container>
    );
  }
}
