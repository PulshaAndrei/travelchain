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

export default class RouteElementCreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      title: '',
      description: '',
      usedContent: []
    };
  }

  static navigationOptions = {
    title: 'RouteElementCreate',
  };

  render() {

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Create Route Element"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {this.state.imageUrl ?
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={{uri: 'http://greecechinabusiness.com/wp-content/uploads/2016/07/travel-tourism-city-landmarks-1050x600_c.jpg'}}
              />
            </View>
            : <TouchableOpacity onPress={() => {}}>
              <View style={styles.uploadImageView}>
                <Icon name="camera-alt" size={52} />
                <Text>Upload media</Text>
              </View>
            </TouchableOpacity>
          }
          <Subheader text="Title" />
          <TextInput
            style={styles.textInput}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <Subheader text="Description" />
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            style={[styles.textInput, styles.textAreaInput]}
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
          />
          <Subheader text="Used Content" />
          {this.state.usedContent.map((content, i) => (
            <ListItem
              key={'content' + i}
              divider
              leftElement={<Avatar text={content.title[0]} />}
              centerElement={{
                primaryText: content.title,
                secondaryText: content.description,
              }}
              rightElement="remove"
              onRightElementPress={() => {}}
            />
          ))}
          <Button primary raised text="Add Content Link" onPress={() => this.props.navigation.navigate('ContentLink')} />
        </ScrollView>
        <Button primary raised style={{container : styles.button}} text="Save" />
      </Container>
    );
  }
}
