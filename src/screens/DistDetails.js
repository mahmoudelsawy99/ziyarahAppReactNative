import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/Colors';
import sizes from '../assets/Sizes';
import { useFonts } from 'expo-font';
import axios from 'axios';
import HTML from 'react-native-render-html';

const { width, height } = Dimensions.get('window');

const Card = ({ title, description, image, location, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.cardImage}>
          <Image style={{ width: '100%', height: '100%', borderRadius: 20 }} source={image} />
        </View>
        <View style={{ flex: 0.6, marginHorizontal: 12, overflow: 'hidden' }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardLocation}>{location}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DistDetails = ({ route, navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  const [destinationData, setDestinationData] = useState(null);

  useEffect(() => {
    // Fetch data for the specific destination using Axios
    axios
      .get(`https://ziyarh.com/api/destination/${route.params.id}`)
      .then((response) => {
        const data = response.data.data;
        setDestinationData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [route.params.id]);

  if (!loaded || !destinationData) {
    return null;
  }
console.log("dist" , destinationData.three_tours)
  return (
    
    <ScrollView style={styles.container}>
      <Image source={{ uri: destinationData.thumbnail }} style={styles.image} resizeMode="cover" />

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>{destinationData.name}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="heart-outline" color={colors.greenLight} size={35} />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.textRating}>Rating</Text>
          <View style={styles.starContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <MaterialCommunityIcons key={index} name="star" color={colors.starColor} size={24} />
            ))}
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.textPrice}>Price</Text>
          <Text style={styles.price}>{destinationData.price}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.textDescription}>Description</Text>
        <HTML source={{ html: destinationData.description }} />
      </View>

      <View style={styles.toursContainer}>
        <Text style={styles.toursHeader}>Tours</Text>
        {destinationData.three_tours.map((tour, index) => (
          <React.Fragment key={tour.id}>
            <Card
              title={tour.title}
              description={`Starts ${tour.start} Ends ${tour.end}\nDuration: ${tour.duration} Hours`}
              image={{ uri: tour.image }} // Use tour.image instead of destinationData.thumbnail
              location={tour.location}
              onPress={() => {
                navigation.navigate('TourDetails', { id: tour.id });
              }}
            />
            {index < destinationData.three_tours.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey,
    marginVertical: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  textHeader: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.headerTourSize,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  wrapperRating: {
    flexDirection: 'column',
  },
  textRating: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.descriptionSize,
  },
  wrapperStars: {
    flexDirection: 'row',
  },
  priceContainer: {},
  textPrice: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.descriptionSize,
  },
  price: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: colors.secondary,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  textDescription: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.descriptionSize,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.paragraphSizeMedium,
    color: colors.secondary,
    height: 100,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,
    height: height / 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },

  cardLocation: {
    fontSize: 11.5,
    color: "#777",
    marginLeft: 10,
  },

  cardDescription: {
    fontSize: 12,
    marginVertical: 8,
    marginLeft: 10,
  },

  cardImage: {
    flex: 0.3,
  },

  seeDetailsButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  seeDetailsButtonText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 30,
    overflow: 'hidden',
  },
  contentContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  descriptionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  toursContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});

export default DistDetails;
