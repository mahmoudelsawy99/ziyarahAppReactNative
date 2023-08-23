import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Card from '../components/DistCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Luxury = () => {
  const [cardData, setCardData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get('https://ziyarh.com/api/destinations')
      .then((response) => {
        const apiData = response.data.data;

        // Convert the API data to the format expected by the Card component
        const newData = apiData.map((item) => ({
          id: item.id, // Use the actual 'id' from the API as the unique key
          header: item.name,
          result: '5.0', // Replace with the appropriate rating value
          reviews: '500', // Replace with the appropriate number of reviews
          image: { uri: item.thumbnail },
        }));

        // Update the cardData state with the fetched data
        setCardData(newData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardPress = (id) => {
    // Check if the id exists and is not null or undefined
    if (id !== null && id !== undefined) {
      // Navigate to the detailed view screen with the destination ID as parameter
      navigation.navigate('DistDetails', { id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cardData}
        renderItem={({ item }) => (
          <Card
            header={item.header}
            result={item.result}
            reviews={item.reviews}
            image={item.image}
            onPress={() => handleCardPress(item.id)}
            key={item.id.toString()} // Use the 'id' as a key for the FlatList item
          />
        )}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id.toString()} // Use keyExtractor for FlatList key
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  flatListContent: {
    paddingVertical: 16, // Adjust top spacing for the FlatList items
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export default Luxury;
