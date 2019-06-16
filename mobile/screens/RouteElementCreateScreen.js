import * as React from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Container from '../components/Container';
import { connect } from 'react-redux';
import {
  Button,
  Avatar,
  ListItem,
  Toolbar,
  Icon,
  Subheader,
  COLOR,
} from 'react-native-material-ui';
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

class RouteElementCreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaUrl: null,
      title: '',
      description: '',
      usedContent: [],
      dialog: {}
    };
  }

  static navigationOptions = {
    title: 'RouteElementCreate',
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
        const mediaUrl = await this.props.pinFileToIPFS(data);
        this.setState({ dialog: { status: 'success', text: 'Successfull uploaded' }});
        this.setState({ mediaUrl });
      } catch (error) {
        this.setState({ dialog: { status: 'error', text: `Error: ${error.response && error.response.data.error.message}` }});
      }
    }
  }

  onCloseDialog() {
    if (this.state.dialog.status === 'success' || this.state.dialog.status === 'error') {
      this.setState({ dialog: {} });
    }
  }

  addContent(el) {
    const usedContent = this.state.usedContent;
    usedContent.push(el);
    this.setState({ usedContent });
  }

  removeContent(i) {
    const usedContent = this.state.usedContent;
    usedContent.splice(i);
    this.setState({ usedContent });
  }

  render() {

    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="Create Route Element"
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={0}
          >
            {this.state.mediaUrl ?
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{uri: this.state.mediaUrl}}
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
                onRightElementPress={() => this.removeContent(i)}
              />
            ))}
            <Button
              primary
              raised
              text="Add Content Link"
              onPress={() => this.props.navigation.navigate('ContentLink', {
                usedContent: this.state.usedContent,
                addContent: (el) => this.addContent(el)
              })} />
          </KeyboardAvoidingView>
        </ScrollView>
        <Button
          primary
          raised
          style={{container : styles.button}}
          onPress={() => {
            this.props.navigation.state.params.addElement(this.state);
            this.props.navigation.goBack();
          }}
          text="Save" />
        <ProgressDialog visible={!!this.state.dialog.status} status={this.state.dialog.status} text={this.state.dialog.text} onClose={() => this.onCloseDialog()} />
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { pinFileToIPFS }
)(RouteElementCreateScreen);