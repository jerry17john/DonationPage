import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FormInput = ({ iconName, value, placeholder, onChangeText, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#6c757d"
        {...props} // Pass any other TextInput props like keyboardType, maxLength etc.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    height: 50,
    flex: 1,
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

export default FormInput;

//FormInput.js