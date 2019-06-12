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

export default class BookRouteScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDiscount: 10
    };
  }

  static navigationOptions = {
    title: 'BookRoute',
  };

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
              source={{uri: 'http://greecechinabusiness.com/wp-content/uploads/2016/07/travel-tourism-city-landmarks-1050x600_c.jpg'}}
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
        <Button primary raised style={{container : styles.button}} text="Confirm Booking" />
      </Container>
    );
  }
}
