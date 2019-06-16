import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import { bookRoute } from '../reducers/route';
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

class BookRouteScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDiscount: 10,
      dialog: {}
    };
  }

  static navigationOptions = {
    title: 'BookRoute',
  };

  onCloseDialog() {
    if (this.state.dialog.status === 'success') {
      this.setState({ dialog: {} });
      this.props.navigation.navigate('Bookings');
    } else if (this.state.dialog.status === 'error') {
      this.setState({ dialog: {} });
    }
  }

  async bookRoute() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.bookRoute(this.props.navigation.state.params.route.routeId, this.state.selectedDiscount);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  render() {
    const { route } = this.props.navigation.state.params;

    const discounts = [
      { discount: 10, part: 90 },
      { discount: 5, part: 75 },
      { discount: 3, part: 50 },
      { discount: 1, part: 25 },
    ]

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Booking Route"
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
          <Subheader text="Information" />
          <Text style={styles.description}>Please, choose the part of price you want to pay and get a discount for the pre-paid booking.</Text>
          <Subheader text="Full Price" />
          <Text style={styles.description}>{route.price} Travel Coins</Text>
          <Subheader text="Discount" />
          {discounts.map((discount, i) => (
            <ListItem
              key={'discount' + i}
              divider
              leftElement={<Avatar text={discount.discount + '%'} />}
              centerElement={{
                primaryText: 'Discount: ' + discount.discount + '%',
                secondaryText: 'Pre-paid payment: ' + discount.part + '%'
              }}
              rightElement={this.state.selectedDiscount === discount.discount && "done"}
              onPress={() => this.setState({ selectedDiscount: discount.discount })}
            />
          ))}
        </ScrollView>
        <Button primary raised style={{container : styles.button}} text="Confirm Booking" onPress={() => this.bookRoute()} />
        <ProgressDialog visible={!!this.state.dialog.status} status={this.state.dialog.status} text={this.state.dialog.text} onClose={() => this.onCloseDialog()} />
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { bookRoute }
)(BookRouteScreen);