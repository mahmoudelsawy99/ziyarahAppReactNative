import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProfileHeader from '../profile/ProfileHeaderScreen';

const TripDetailsScreen = ({ route }) => {
  // Sample data (replace with actual data from your backend or state management)
  const tripId = route.params.tripId;
  const tripData = {
    id: tripId,
    name: 'Trip to the Mountains',
    location: 'Mountain Range, USA',
    profilePicture: require('../../assets/imgs/logo-empty.png'), // Replace with the actual profile picture
    // Add more trip details and statistics as needed
  };

  return (
    <View style={styles.container}>
      <Image source={tripData.image} style={styles.tripImage} />
      <Text style={styles.tripName}>{tripData.name}</Text>
      <Text style={styles.tripLocation}>{tripData.location}</Text>
      {/* Display additional trip details and statistics */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tripImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  tripName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tripLocation: {
    fontSize: 16,
    color: '#888',
  },
});

export default TripDetailsScreen;
