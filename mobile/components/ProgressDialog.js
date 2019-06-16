import React from 'react';
import { Icon, View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR } from 'react-native-material-ui';

export default ProgressDialog = ({ visible, status, text, onClose }) => visible && (
  <TouchableOpacity onPress={() => status !== 'progress' && onClose()} style={[styles.container, !visible && { display: 'none' }]}>
      <View style={[styles.content, text && { width: '75%'}]}>
        <View style={styles.loading}>
          <View style={styles.loader}>
            {status === 'progress' && <ActivityIndicator size="large" />}
            {status === 'success' && <MaterialIcons name="done" size={60} color={COLOR.green400} />}
            {status === 'error' && <MaterialIcons name="clear" size={60} color={COLOR.red400} />}
            {text && <Text>{text}</Text>}
          </View>
        </View>
      </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: -25,
    bottom: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  content: {
    width: 120,
    minHeight: 120,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    flex: 3,
    fontSize: 16,
    paddingHorizontal: 10,
  }
});