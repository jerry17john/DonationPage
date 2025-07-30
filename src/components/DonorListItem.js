import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DonorListItem = ({ item, onEdit, onDelete }) => (
  <View style={styles.itemContainer}>
    <View style={styles.iconContainer}>
      <Icon name="user-circle" size={30} color="#003366" />
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.details}>Blood Group: {item.bloodGroup} | Mobile: {item.mobile}</Text>
      <Text style={styles.donorId}>ID: {item.id}</Text>
    </View>
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.actionButton}>
        <Icon name="edit" size={18} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
        <Icon name="trash-alt" size={18} color="#dc3545" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  iconContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  donorId: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 5,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
  },
});

export default DonorListItem;

//DonarListItem.js