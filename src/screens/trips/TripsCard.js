import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TripsCard = ({ tripData, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={tripData.image} style={styles.tripImage} />
      <Text style={styles.tripName}>{tripData.name}</Text>
      <Text style={styles.tripLocation}>{tripData.location}</Text>
      {/* Add more trip details or statistics as needed */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 200,
  },
  tripName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  tripLocation: {
    fontSize: 16,
    color: '#888',
  },
});

export default TripsCard;
