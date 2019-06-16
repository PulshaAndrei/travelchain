import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import ProgressDialog from '../components/ProgressDialog';
import { likeRoute, finishPriceTestingAuction } from '../reducers/route';
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

class RouteDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'observing',
      dialog: {}
    };
  }

  static navigationOptions = {
    title: 'RouteDetails',
  };

  onCloseDialog() {
    if (this.state.dialog.status === 'success') {
      this.setState({ dialog: {} });
      this.props.navigation.goBack();
    } else if (this.state.dialog.status === 'error') {
      this.setState({ dialog: {} });
    }
  }

  async likeRoute() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.likeRoute(this.props.navigation.state.params.route.routeId);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  async finishPriceTesting() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.finishPriceTestingAuction(this.props.navigation.state.params.route.routeId);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  render() {
    const { route } = this.props.navigation.state.params;

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Route Details"
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
          {route.status === 'OBSERVABLE' && <Subheader text="Number of Likes" />}
          {route.status === 'OBSERVABLE' && <Text style={styles.description}>{route.likes && route.likes.length} likes</Text>}
          {route.status === 'SHORT_LIST' && <Subheader text="Full Price" />}
          {route.status === 'SHORT_LIST' && <Text style={styles.description}>{route.price} Travel Coins</Text>}
          {route.routeElements.map((routeElement, i) => (
            <ListItem
              key={'routeElement' + i}
              divider
              leftElement={routeElement.mediaUrl
                ? (<Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: routeElement.mediaUrl}} />} />)
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
        {route.status === 'OBSERVABLE' &&
          <Button
            primary
            raised
            style={{container : styles.button}}
            onPress={() => this.likeRoute()}
            text="Like" />}
        {route.status === 'SHORT_LIST' &&
          <Button
            primary 
            raised
            style={{container : styles.button}}
            onPress={() => this.props.navigation.navigate('BookRoute', { route })}
            text="Book" />}
        {route.status === 'PRICE_TESTING' && route.creator === `resource:org.travelchain.network.User#${this.props.user.userId}` &&
          <Button
            primary 
            raised
            style={{container : styles.button}}
            onPress={() => this.finishPriceTesting()}
            text="Finish Price Testing Auction" />}
        <ProgressDialog visible={!!this.state.dialog.status} status={this.state.dialog.status} text={this.state.dialog.text} onClose={() => this.onCloseDialog()} />
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.wallet.user,
  }),
  { likeRoute, finishPriceTestingAuction }
)(RouteDetailsScreen);