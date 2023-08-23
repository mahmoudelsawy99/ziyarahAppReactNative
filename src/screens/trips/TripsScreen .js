import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TripsCard from './TripsCard';

const TripsScreen = ({ navigation }) => {
  // Sample data (replace with actual data from your backend or state management)
  const tripsData = [
    {
      id: '1',
      name: 'Trip to the Mountains',
      location: 'Mountain Range, USA',
      profilePicture: require('../../assets/imgs/logo-empty.png'), // Replace with the actual profile picture
      // Add more trip details and statistics as needed
    },
    {
      id: '2',
      name: 'Beach Vacation',
      location: 'Tropical Beach, Maldives',
      image: require('./assets/trip2.jpg'), // Replace with the actual trip image
      // Add more trip details and statistics as needed
    },
    // Add more trips data
  ];

  const handleTripDetails = (tripId) => {
    // Implement navigation to the TripDetailsScreen with the selected tripId
    navigation.navigate('TripDetails', { tripId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tripsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTripDetails(item.id)}>
            <TripsCard tripData={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TripsScreen;
