import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const TourDetails = ({ route, navigation }) => {
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    fetchTourData(route.params.id);
  }, [route.params.id]);

  const fetchTourData = (id) => {
    // Fetch tour details using API
    fetch(`https://ziyarh.com/api/tour/${id}`)
      .then((response) => response.json())
      .then((data) => setTourData(data.data))
      .catch((error) => {
        console.error('Error fetching tour details:', error);
      });
  };

  if (!tourData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Tour Title */}
      <Text style={styles.title}>{tourData.title}</Text>

      {/* Tour Image */}
      <TouchableOpacity onPress={() => alert('Enlarge image here')}>
        <Image source={{ uri: tourData.destination.thumbnail }} style={styles.image} />
      </TouchableOpacity>

      {/* Tour Description */}
      <Text style={styles.description}>{tourData.destination.description}</Text>

      {/* Tour Facilities */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.facilitiesTitle}>Facilities Available</Text>
        {tourData.facilities.map((facility) => (
          <View key={facility.id} style={styles.facilityItem}>
            <MaterialCommunityIcons name={facility.icon ? `mdi-${facility.icon}` : 'alert'} size={24} />
            <Text style={styles.facilityName}>{facility.name}</Text>
          </View>
        ))}
      </View>

      {/* Tour Plans */}
      <View style={styles.tourPlansContainer}>
        <Text style={styles.tourPlansTitle}>Tour Plans</Text>
        {tourData.tourPlans.map((plan) => (
          <TouchableOpacity key={plan.id} style={styles.tourPlan} onPress={() => alert(plan.description)}>
            <Text style={styles.tourPlanTitle}>{plan.title}</Text>
            <Text style={styles.tourPlanTime}>{plan.time}</Text>
            <Text style={styles.tourPlanDescription}>{plan.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* See Schedules Button */}
      <TouchableOpacity
        style={styles.seeSchedulesButton}
        onPress={() => navigation.navigate('TourSchedules', { data: tourData })}
      >
        <Text style={styles.buttonText}>See Schedules</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: 'gray',
  },
  facilitiesContainer: {
    marginBottom: 16,
  },
  facilitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  facilityName: {
    fontSize: 16,
    marginLeft: 8,
  },
  tourPlansContainer: {
    marginBottom: 16,
  },
  tourPlansTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tourPlan: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  tourPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tourPlanTime: {
    fontSize: 16,
    color: 'gray',
  },
  tourPlanDescription: {
    fontSize: 16,
  },
  seeSchedulesButton: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TourDetails;
