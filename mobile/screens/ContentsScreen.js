import * as React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
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
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: COLOR.green300
  },
});

export default class ContentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'all'
    };
  }

  static navigationOptions = {
    title: 'Content',
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
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.openDrawer()}
          centerElement="Content"
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          onScroll={this.onScroll}
        >
          {this.state.active === 'all' && <Subheader text="All Content" />}
          {this.state.active === 'mycontent' && <Subheader text="My Content" />}
          {contents.map((content, i) => (
            <TouchableOpacity onPress={() => this.props.navigation.push('ContentDetails', { content })} key={'content'+i}>
              <View style={[styles.card, { backgroundColor: COLOR.green400 }]}>
                <View style={{ marginRight: 10 }}>
                  <Avatar text={content.title[0]} style={{container: { backgroundColor: COLOR.white }, content: { color: COLOR.black }}} />
                </View>
                <View>
                  <Text style={[styles.cardTitle, { color: COLOR.white }]}>{content.title}</Text>
                  <Text style={[styles.cardADesc, { color: COLOR.white }]}>{content.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ActionButton
          style={{ positionContainer: { bottom: 76 }, container: { shadowRadius: 5, backgroundColor: COLOR.green400 }}}
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
