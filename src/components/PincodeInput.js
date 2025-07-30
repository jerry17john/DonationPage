import React from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PincodeInput = ({ value, onChangeText, onBlur, isLoading }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name="map-pin" style={styles.icon} />
      <TextInput
        placeholder="Pin code"
        keyboardType="numeric"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        maxLength={6}
        onBlur={onBlur} // The API call is triggered from the parent component
        placeholderTextColor="#6c757d"
      />
      {/* Show the loading spinner only when isLoading is true */}
      {isLoading && <ActivityIndicator style={{ marginRight: 15 }} color="#003366" />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 16,
    color: '#555',
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingRight: 15,
    color: '#333',
  },
});

export default PincodeInput;

//PincodeInput.js