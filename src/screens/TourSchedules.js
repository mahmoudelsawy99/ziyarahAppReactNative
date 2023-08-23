import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const TourSchedules = ({ route, navigation }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules(route.params.data.id);
  }, [route.params.data.id]);

  const fetchSchedules = (id) => {
    axios
      .get(`https://ziyarh.com/api/schedules/${id}`)
      .then((response) => {
        console.log('API response:', response.data.data.schedules);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return response.data.data;
      })
      .then((data) => {
        setSchedules(data.schedules);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tour schedules:', error);
        setError('Error fetching tour schedules. Please try again later.');
        setLoading(false);
      });
  };
  

  const handleBookNow = (id) => {
    navigation.navigate('TourBooking', { scheduleId: id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const { data } = route.params;

  const renderPassengerTypeItem = ({ item }) => (
    <View style={styles.passengerTypeItem}>
      <Text>{item.name}</Text>
      <Text>
        <FontAwesome name="money" size={16} color="green" /> {item.price} S.R
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <Image source={{ uri: data.destination?.images[0] }} style={styles.image} />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.destination?.description}</Text>
          <Text style={styles.price}>
            <FontAwesome name="money" size={20} color="green" /> {data.price} S.R
          </Text>
          <Text style={styles.duration}>
            <FontAwesome name="clock-o" size={20} color="black" /> {data.duration} days
          </Text>
          <View style={styles.passengerTypesContainer}>
            <Text style={styles.passengerTypesTitle}>Passenger Types:</Text>
            <FlatList
              data={data.passengerTypes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPassengerTypeItem}
            />
          </View>
          <View style={styles.schedulesContainer}>
            <Text style={styles.schedulesTitle}>Tour Schedules:</Text>
            {schedules.length === 0 ? (
              <Text style={styles.noSchedulesText}>No schedules available now.</Text>
            ) : (
              schedules.map((item) => (
                <TouchableOpacity key={item.id} style={styles.scheduleItem} >
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleDate}>
                      <FontAwesome name="calendar" size={16} color="gray" /> {item.human_start || 'Date N/A'}
                    </Text>
                    <Text style={styles.schedulePrice}>
                      <FontAwesome name="users" size={16} color="gray" /> {item.places ? `${item.places} Places` : 'No Places'}
                    </Text>
                    <Text style={styles.schedulePrice}>
                      <FontAwesome name="money" size={16} color="green" /> {item.price ? `${item.price} S.R` : 'Price N/A'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.bookButton} onPress={() => handleBookNow(item.id)}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 12,
  },
  scheduleDate: {
    fontSize: 16,
  },
  schedulePrice: {
    fontSize: 16,
    color: 'green',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
  },
  duration: {
    fontSize: 20,
    marginBottom: 8,
  },
  passengerTypesContainer: {
    marginBottom: 16,
  },
  passengerTypesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passengerTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  schedulesContainer: {
    marginBottom: 16,
  },
  schedulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noSchedulesText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
});

export default TourSchedules;
