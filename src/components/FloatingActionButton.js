import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Icon name="plus" size={20} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#003366',
    borderRadius: 30,
    elevation: 8,
  },
});

export default FloatingActionButton;

//FloatingActionButton.js