import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FormPicker = ({ iconName, selectedValue, onValueChange, items, iconColor }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} style={[styles.icon, { color: iconColor || '#555' }]} />
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {items.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
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
    marginHorizontal: 15,
  },
  picker: {
    flex: 1,
    color: '#333',
  },
});

export default FormPicker;

//FormPicker.js