import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TourBooking = () => {
  const [passengers, setPassengers] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Call the function that handles the API request and AsyncStorage retrieval
    getDataFromAPIAndAsyncStorage();
  }, []);

  const getDataFromAPIAndAsyncStorage = async () => {
    // ... (same as before)
  };

  const handleDetectLocation = async () => {
    try {
      // Check and request location permission
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Get the current location
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Do something with the latitude and longitude (e.g., store them in state or send them to the server)
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
          },
          (error) => {
            console.error('Error getting current location:', error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleBookingSubmit = async () => {
    // ... (same as before, handle booking submit logic)
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tour Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Passengers"
        keyboardType="numeric"
        value={passengers}
        onChangeText={setPassengers}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.detectButton} onPress={handleDetectLocation}>
        <Text style={styles.detectButtonText}>Detect Live Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookingSubmit}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  detectButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 5,
  },
  detectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

 export default TourBooking;
