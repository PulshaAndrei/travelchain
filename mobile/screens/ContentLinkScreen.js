import * as React from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
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
  uploadImageView: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  textInput: {
    height: 40,
    borderColor: COLOR.blue300,
    borderWidth: 1,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  textAreaInput: {
    height: 120,
  }
});

export default class ContentLinkScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      title: '',
      description: '',
      royaltyPercent: '0',
      royaltyPrice: '0',
    };
  }

  static navigationOptions = {
    title: 'ContentLink',
  };

  render() {
    const contents = [
      {
        title: 'Content Title',
        description: 'Description 1'
      },
      {
        title: 'Content Title 1',
        description: 'Description 2'
      },
      {
        title: 'Content Title 2',
        description: 'Description 3'
      },
    ];

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Add Content Link"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {contents.map((content, i) => (
            <ListItem
              key={'content' + i}
              divider
              leftElement={<Avatar text={content.title[0]} />}
              centerElement={{
                primaryText: content.title,
                secondaryText: content.description,
              }}
              onPress={() => this.props.navigation.goBack()}
            />
          ))}
        </ScrollView>
      </Container>
    );
  }
}
