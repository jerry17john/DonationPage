import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SearchBar = ({ query, onQueryChange }) => (
  <View style={styles.searchContainer}>
    <Icon name="search" size={15} color="#999" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search by name, blood group, ID..."
      value={query}
      onChangeText={onQueryChange}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;

//SearxhBar.js