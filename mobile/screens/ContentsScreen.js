import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Container from '../components/Container';
import { connect } from 'react-redux';
import {
  ActionButton,
  Avatar,
  Toolbar,
  BottomNavigation,
  Subheader,
  COLOR,
} from 'react-native-material-ui';
import { loadContents } from '../reducers/content';

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    marginTop: 0,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardDesc: {
    textAlign: 'left',
    marginRight: 20,
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: COLOR.green300
  },
});

class ContentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'all'
    };
  }

  componentDidMount() {
    this.props.loadContents();
  }

  static navigationOptions = {
    title: 'Content',
  };

  render() {
    const contents = this.props.contents
      .filter(el => this.state.active === 'all'
        ? true
        : el.creator === `resource:org.travelchain.network.User#${this.props.user.userId}`);
    return (
      <Container>
        <Toolbar
          key="toolbar"
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.openDrawer()}
          centerElement="Content"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {this.props.loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}
          {!this.props.loading && 
            <View>
              {this.state.active === 'all' && <Subheader text="All Content" />}
              {this.state.active === 'mycontent' && <Subheader text="My Content" />}
              {contents.map((content, i) => (
                <TouchableOpacity onPress={() => this.props.navigation.push('ContentDetails', { content })} key={'content'+i}>
                  <View style={[styles.card, { backgroundColor: COLOR.green400 }]}>
                    <View style={{ marginRight: 10 }}>
                      {!content.mediaUrl && <Avatar text={content.title[0]} style={{container: { backgroundColor: COLOR.white }, content: { color: COLOR.black }}} />}
                      {content.mediaUrl && <Avatar image={<Image style={{ width: '100%', height: '100%', borderRadius: 25}} source={{uri: content.mediaUrl}} />} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} style={[styles.cardTitle, { color: COLOR.white }]}>{content.title}</Text>
                      <Text numberOfLines={3} style={[styles.cardADesc, { color: COLOR.white }]}>{content.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>}
        </ScrollView>
        <ActionButton
          style={{ positionContainer: { bottom: 76 }, container: { shadowRadius: 5, backgroundColor: COLOR.blue400 }}}
          onPress={() => this.props.navigation.push('ContentCreate')}
        />
        <BottomNavigation active={this.state.active} hidden={false} >
            <BottomNavigation.Action
                key="all"
                icon="inbox"
                label="All content"
                onPress={() => this.setState({ active: 'all' })}
            />
            <BottomNavigation.Action
                key="mycontent"
                icon="person"
                label="My Content"
                onPress={() => this.setState({ active: 'mycontent' })}
            />
        </BottomNavigation>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    user: state.wallet.user,
    contents: state.content.contents,
    loading: state.content.loading
  }),
  { loadContents }
)(ContentsScreen);