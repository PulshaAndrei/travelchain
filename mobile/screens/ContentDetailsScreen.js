import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import {
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
    textAlign: 'left',
  },
  button: {
    height: 50,
    backgroundColor: COLOR.green400
  },
});

export default class ContentDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'observing'
    };
  }

  static navigationOptions = {
    title: 'ContentDetails',
  };

  render() {
    const { content } = this.props.navigation.state.params;

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Content Details"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{uri: content.mediaUrl || 'http://greecechinabusiness.com/wp-content/uploads/2016/07/travel-tourism-city-landmarks-1050x600_c.jpg'}}
            />
          </View>
          <Text style={styles.title}>{content.title}</Text>
          <Subheader text="Description" />
          <Text style={styles.description}>{content.description}</Text>
          <Subheader text="Royalty Percent" />
          <Text style={styles.description}>{content.royaltyPercent || 0}%</Text>
          <Subheader text="Royalty Price" />
          <Text style={styles.description}>{content.royaltyPrice || 0} Travel Coins</Text>
        </ScrollView>
      </Container>
    );
  }
}
