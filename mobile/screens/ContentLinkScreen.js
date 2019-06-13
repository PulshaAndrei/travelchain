import * as React from 'react';
import { ScrollView, Image } from 'react-native';
import Container from '../components/Container';
import { connect } from 'react-redux';
import {
  Avatar,
  ListItem,
  Toolbar,
} from 'react-native-material-ui';
import { loadContents } from '../reducers/content';


class ContentLinkScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadContents();
  }

  static navigationOptions = {
    title: 'ContentLink',
  };

  render() {
    const contents = this.props.contents
      .filter(el => !this.props.navigation.state.params.usedContent.find(c => c.title === el.title))
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
              leftElement={content.imageUrl
                ? (<Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: content.imageUrl}} />} />)
                : (<Avatar text={content.title[0]} />)}
              centerElement={{
                primaryText: content.title,
                secondaryText: content.description,
              }}
              onPress={() => {
                this.props.navigation.state.params.addContent(content);
                this.props.navigation.goBack();
              }}
            />
          ))}
        </ScrollView>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    contents: state.content.contents,
  }),
  { loadContents }
)(ContentLinkScreen);