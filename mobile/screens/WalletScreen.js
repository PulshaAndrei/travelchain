import * as React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
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
    justifyContent: 'center',
    backgroundColor: COLOR.blue500,
  },
  moneyIcon: {
    backgroundColor: COLOR.white,
  },
  moneyNumber: {
    color: COLOR.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  moneyCurrency: {
    color: COLOR.white,
    textAlign: 'right',
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: COLOR.green300
  },
});

export default class WalletScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Wallet',
  };

  render() {
    const money = 1567.4456;
    const transactions = [
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
      {
        title: 'Booking',
        date: new Date(),
        value: 143.556
      },
    ];
    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.openDrawer()}
          centerElement="Wallet"
        />
        <Subheader text="TravelCoin Wallet" />
        <View style={styles.card}>
          <Avatar icon="monetization-on" style={{container: styles.moneyIcon}} iconSize={45} iconColor={COLOR.yellow600} />
          <View>
            <Text style={styles.moneyNumber}>{Math.round(money * 100) / 100}</Text>
            <Text style={styles.moneyCurrency}>Travel Coins</Text>
          </View>
        </View>
        <Subheader text="Last transactions" />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {transactions.map((transaction, i) => (
            <ListItem
              key={transaction.title + i}
              divider
              leftElement={<Avatar text={transaction.title[0]} />}
              centerElement={{
                primaryText: transaction.title,
                secondaryText: `Travel Coins: ${Math.round(transaction.value * 100) / 100}`,
              }}
              rightElement="info"
            />
          ))}
        </ScrollView>
      </Container>
    );
  }
}
