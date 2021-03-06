import * as React from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Container from '../components/Container';
import { connect } from 'react-redux';
import {
  Button,
  Toolbar,
  Icon,
  Subheader,
  COLOR,
  ListItem,
  Avatar,
} from 'react-native-material-ui';
import { createRoute } from '../reducers/route';
import { pinFileToIPFS } from '../reducers/upload';
import FormData from 'form-data';
import { ImagePicker, Permissions, Constants } from 'expo';

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

class RouteCreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      title: '',
      description: '',
      routeElements: [],
      dialog: {}
    };
  }

  static navigationOptions = {
    title: 'RouteCreate',
  };

  async componentDidMount() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async selectImage() {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!response.cancelled) {
      let data = new FormData();
      data.append('file', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });

      try {
        this.setState({ dialog: { status: 'progress' }});
        const imageUrl = await this.props.pinFileToIPFS(data);
        this.setState({ dialog: { status: 'success', text: 'Successfull uploaded' }});
        this.setState({ imageUrl });
      } catch (error) {
        this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
      }
    }
  }

  addRouteElement(el) {
    const routeElements = this.state.routeElements;
    routeElements.push(el);
    this.setState({ routeElements });
  }

  removeRouteElement(i) {
    let routeElements = this.state.routeElements;
    routeElements.splice(i, 1);
    this.setState({ routeElements });
  }

  onCloseDialog() {
    if (this.state.dialog.status === 'success') {
      this.setState({ dialog: {} });
      if (this.state.dialog.text === 'Success') {
        this.props.navigation.goBack();
      }
    } else if (this.state.dialog.status === 'error') {
      this.setState({ dialog: {} });
    }
  }

  async addRoute() {
    try {
      this.setState({ dialog: { status: 'progress' }});
      await this.props.createRoute(this.state);
      this.setState({ dialog: { status: 'success', text: 'Success' }});
    } catch (error) {
      this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
    }
  }

  render() {

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Create Route"
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={0}
          >
            {this.state.imageUrl ?
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{uri: this.state.imageUrl}}
                />
              </View>
              : <TouchableOpacity onPress={() => this.selectImage()}>
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
            <Subheader text="Route Elements" />
            {this.state.routeElements.map((routeElement, i) => (
              <ListItem
                key={'content' + i}
                divider
                leftElement={<Avatar text={routeElement.title[0] || ' '} />}
                centerElement={{
                  primaryText: routeElement.title || ' ',
                  secondaryText: routeElement.description || ' ',
                }}
                rightElement="remove"
                onRightElementPress={() => this.removeRouteElement(i)}
              />
            ))}
            <Button
              primary
              raised text="Add Route Element"
              onPress={() => this.props.navigation.navigate('RouteElementCreate', { addElement: (el) => this.addRouteElement(el) })} />
          </KeyboardAvoidingView>
        </ScrollView>
        <Button
          primary
          raised
          style={{container : styles.button}}
          onPress={() => this.addRoute()}
          text="Save" />
        <ProgressDialog visible={!!this.state.dialog.status} status={this.state.dialog.status} text={this.state.dialog.text} onClose={() => this.onCloseDialog()} />
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { createRoute, pinFileToIPFS }
)(RouteCreateScreen);